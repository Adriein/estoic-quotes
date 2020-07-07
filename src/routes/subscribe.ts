import express, { Router, Request, Response, NextFunction } from 'express';
import {
  RegisterSubscriberUseCase,
  RetriveAllSubscribersUseCase,
  UnRegisterSubscriberUseCase,
  ConfirmSubscriberUseCase,
  SendMailsUseCase,
} from '../core/usecases';
import { Subscriber, Repository, Mailer as IMailer } from '../core/entities';
import * as EmailValidator from 'email-validator';
import { BadRequest } from '../core/errors';
import { requireAuth } from './middlewares/auth';
import { SubscriberRepository } from '../infrastructure/repository';
import { Mailer } from '../infrastructure/services/Mailer';

const router: Router = express.Router();
const repository: Repository<Subscriber> = new SubscriberRepository();
const mailer: IMailer = new Mailer();

router.get(
  '/subscribers',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveAllSubscribersUseCase(repository);
      const response = await usecase.execute();
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/subscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if (!email || !EmailValidator.validate(email)) {
        throw new BadRequest('The email is invalid');
      }
      const usecase = new RegisterSubscriberUseCase(repository, mailer);
      const response = await usecase.execute(req.body);
      res.status(200).send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/unsubscribe',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if (!email || EmailValidator.validate(email)) {
        throw new BadRequest('The email is invalid');
      }
      const usecase = new UnRegisterSubscriberUseCase(repository);
      const response = await usecase.execute(req.body);
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/confirm',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new ConfirmSubscriberUseCase(repository);
      const response = await usecase.execute(req.body);
      res.status(200).send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/send',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new SendMailsUseCase(repository, mailer);
      const response = await usecase.execute();
      res.status(200).send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);

export { router as subscribe };
