import express, { Router, Request, Response, NextFunction } from 'express';
import { QuoteRepository } from '../infrastructure/repository/QuoteRepository';
import { Quote, QuoteRepository as Repository } from '../core/entities';
import {
  RetriveAllQuotesUseCase,
  ReadQuoteUseCase,
  CreateQuoteUseCase,
  ModifyQuoteUseCase,
} from '../core/usecases';
import { requireAuth } from './middlewares/auth';

const router: Router = express.Router();
const repository: Repository<Quote> = new QuoteRepository();

router.get(
  '/quotes',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveAllQuotesUseCase(repository);
      const response = await usecase.execute();
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/quote/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new ReadQuoteUseCase(repository);
      const response = await usecase.execute(req.params.id);
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/quote',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new CreateQuoteUseCase(repository);
      const response = await usecase.execute(req.body);
      
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/quote',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new ModifyQuoteUseCase(repository);
      const response = await usecase.execute(req.body);
      res.send(response.data);
      return;
    } catch (error) {
      next(error);
    }
  }
);
//   .delete('/quote/:id', async (req: Request, res: Response) => {
//     return;
//   });

export { router as quotes };
