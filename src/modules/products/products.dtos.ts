import { IsString, Length, IsNumber, IsPositive } from 'class-validator';

export class CreateProductRequest {
	@IsString()
	@Length(1, 50)
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
