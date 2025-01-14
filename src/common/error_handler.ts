import { type NextFunction, type Request, type Response } from 'express';
import { ApplicationError, DomainError, InfrastructureError } from './errors';

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
		});
	} else if (err instanceof InfrastructureError) {
		res.status(500).json({
			message: 'Something went wrong. Please try again later.',
		});
	} else {
		if (process.env.APP_ENV === 'dev') {
			res.status(500).json({
				message: err.message,
				errors: [],
				stack: err.stack,
			});
		} else {
			res.status(500).json({
				message: 'Something went wrong.',
				errors: [],
			});
		}
	}
};
