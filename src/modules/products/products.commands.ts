import { Command } from '../../common/cqrs/command';
import { Product } from './domain/product';

export class CreateProductCommand extends Command<{
	name: string;
	description: string;
	price: number;
	stock: number;
}> {}

export const createProductHandler = async (command: CreateProductCommand) => {
	const product = new Product(command.params);

	await product.create();
};
