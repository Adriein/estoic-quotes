import { Router, Request, Response, NextFunction } from 'express';
import express from 'express';
import { Repository } from '../core/entities/Repository';
import { QuoteRepository } from '../infrastructure/repository/QuoteRepository';
import { Quote } from '../core/entities/Quote';
import { RetriveAllQuotesUseCase } from '../core/usecases/RetriveAllQuotesUseCase';

const router: Router = express.Router();
const repository: Repository<Quote> = new QuoteRepository();

router.get(
  '/quotes',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveAllQuotesUseCase(repository);
      const response = await usecase.execute();
      res.send(response);
      return;
    } catch (error) {
      next(error);
    }
  }
);
//   .get(
//     '/quote/:id',
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const usecase = new UsersReadUseCase(database);
//         const response = await usecase.execute(parseInt(req.params.id));
//         res.send(response.getData());
//         return;
//       } catch (error) {
//         next(error);
//       }
//     }
//   )
//   .post('/quote', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const usecase = new UsersCreateUseCase(database);
//       const response = await usecase.execute(undefined, req.body);
//       res.send(response.getData());
//       return;
//     } catch (error) {
//       next(error);
//     }
//   })
//   .put(
//     '/quote/:id',
//     async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         const usecase = new UsersModifyUseCase(database);
//         const response = await usecase.execute(parseInt(req.params.id), req.body);
//         res.send(response.getData());
//         return;
//       } catch (error) {
//         next(error);
//       }
//     }
//   )
//   .delete('/quote/:id', async (req: Request, res: Response) => {
//     return;
//   });

export { router as quotesRouter };
