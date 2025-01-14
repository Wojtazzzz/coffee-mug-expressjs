import { type NextFunction, type Request, type Response } from 'express';
import { ApplicationError, DomainError } from './errors';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof DomainError) {
		res.status(400).json({
			message: err.message,
			errors: err.errors,
		});
	} else if (err instanceof ApplicationError) {
		res.status(400).json({
			message: err.message,
			errors: err.errors,
		});
	} else {
		if (process.env.APP_ENV === 'local') {
			res.status(500).json({
				message: err.message,
				errors: [],
			});
		} else {
			res.status(500).json({
				message: 'Something went wrong.',
				errors: [],
			});
		}
	}
};
