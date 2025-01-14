import { ObjectId } from 'mongodb';
import { Command } from '../../../common/cqrs/command';
import { ApplicationError } from '../../../common/errors';
import { mapProductDocumentToEntity } from '../../products/products.mappers';
import { findProductById } from '../../products/products.repository';
import { Order } from '../domain/order.entity';

export class CreateOrderCommand extends Command<{
	customerId: string;
	products: {
		id: string;
	}[];
}> {}

export const createOrderHandler = async (command: CreateOrderCommand) => {
	const order = new Order({
		customerId: command.params.customerId,
	});

	const products = [];

	for (const product of command.params.products) {
		const document = await findProductById(product.id);

		if (!document || !ObjectId.isValid(product.id)) {
			throw new ApplicationError(`Product "${product.id}" not found.`);
		}

		products.push(mapProductDocumentToEntity(document));
	}

	await order.create(products);
};
