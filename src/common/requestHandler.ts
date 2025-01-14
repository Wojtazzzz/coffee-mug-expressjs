import {
	type RequestHandler,
	type NextFunction,
	type Request,
	type Response,
} from 'express';

export const requestHandler =
	<Dto>(fn: RequestHandler<any, any, Dto>) =>
	(req: Request<{}, {}, Dto>, res: Response, next: NextFunction) => {
		return Promise.resolve(fn(req, res, next)).catch(next);
	};
