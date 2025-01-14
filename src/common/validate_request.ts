import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type Request, type Response, type NextFunction } from 'express';

export const validateRequest = <Dto extends object>(
	requestDto: new () => Dto,
) => {
	return async (
		req: Request<{}, {}, Dto>,
		res: Response,
		next: NextFunction,
	) => {
		const dtoObject = plainToInstance(requestDto, req.body);
		const errors = await validate(dtoObject, {
			skipMissingProperties: true,
		});

		if (errors.length > 0) {
			res.status(422).json({
				errors: errors.map((err) => ({
					property: err.property,
					constraints: err.constraints,
				})),
			});

			return;
		}

		req.body = dtoObject;

		next();
	};
};
