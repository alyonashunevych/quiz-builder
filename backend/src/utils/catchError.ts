import type {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express';

export const catchError = (action: RequestHandler): RequestHandler => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
