import {
	IsString,
	Length,
	IsNumber,
	IsPositive,
	Validate,
} from 'class-validator';
import { ValidObjectId } from '../../common/validators';

export class CreateProductRequest {
	@IsString()
	@Length(1, 50)
	@Validate(ValidObjectId)
	name: string;

	@IsString()
	@Length(1, 50)
	description: string;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsNumber()
	@IsPositive()
	stock: number;
}
