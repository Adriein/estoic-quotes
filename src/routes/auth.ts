import express, { Router, Request, Response, NextFunction } from 'express';
import { Repository, User, Result } from '../core/entities';
import { RegisterUseCase } from '../core/usecases';
import { UserRepository } from '../infrastructure/repository';

const router: Router = express.Router();
const repository: Repository<User> = new UserRepository();

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usecase = new RegisterUseCase(repository);
      const response = await usecase.execute(req.body);
      res.send(response.data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as auth };
