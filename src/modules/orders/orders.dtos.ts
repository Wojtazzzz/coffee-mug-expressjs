import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsString,
	Validate,
	ValidateNested,
} from 'class-validator';
import { ValidObjectId } from '../../common/validators';

export class ProductDto {
	@IsString()
	@IsNotEmpty()
	@Validate(ValidObjectId)
	id: string;
}

export class OrderProductDto {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsNumber()
	price: number;
}

export class CreateOrderRequest {
	@IsString()
	@IsNotEmpty()
	customerId: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductDto)
	products: ProductDto[];
}
