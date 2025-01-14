import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	type ValidationArguments,
} from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ name: 'isValidObjectId', async: false })
export class ValidObjectId implements ValidatorConstraintInterface {
	validate(text: string, args: ValidationArguments) {
		return ObjectId.isValid(text);
	}
}
