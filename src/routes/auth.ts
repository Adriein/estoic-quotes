import express, { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Repository, User } from '../core/entities';
import { RegisterUseCase, SignInUseCase } from '../core/usecases';
import { UserRepository } from '../infrastructure/repository';
import { maskFields } from '../core/helpers';

const router: Router = express.Router();
const repository: Repository<User> = new UserRepository();
router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Creating the user
      const usecase = new RegisterUseCase(repository);
      const [user] = (await usecase.execute(req.body)).data;

      const { _id, email, username } = user;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: _id,
          email,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      //Mask dangerous fields
      const secureUser = maskFields(user, ['password']);

      res.status(201).send(secureUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new SignInUseCase(repository);
      const [user] = (await usecase.execute(req.body)).data;

      const { _id, email, username } = user;

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: _id,
          email,
          username,
        },
        process.env.JWT_KEY!
      );

      // Store it on session object
      req.session = {
        jwt: userJwt,
      };

      //Mask dangerous fields 
      const secureUser = maskFields(user, ['password']);
      
      res.status(200).send(secureUser);
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
