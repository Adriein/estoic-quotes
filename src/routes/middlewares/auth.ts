import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../../core/errors';

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }

//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY!
//     ) as UserPayload;
//     req.currentUser = payload;
//   } catch (err) {}

//   next();
// };

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.session!.jwt)
  if (!req.session || !req.session.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.session = payload;
    next();
  } catch (err) {
    throw new NotAuthorizedError();
  }
};
