import express, { Router, Request, Response, NextFunction } from 'express';
import { Repository, MasterData } from '../core/entities';
import { RetriveMasterDataUseCase } from '../core/usecases';
import { requireAuth } from './middlewares/auth';
import { MasterDataRepository } from '../infrastructure/repository';

const router: Router = express.Router();
const repository: Repository<MasterData> = new MasterDataRepository();

router.get(
  '/masterdata',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RetriveMasterDataUseCase(repository);
      const response = (await usecase.execute()).data;

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

export { router as masterData };
