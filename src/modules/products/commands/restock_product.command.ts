import { Command } from '../../../common/cqrs/command';
import { mapProductDocumentToEntity } from '../products.mappers';
import { ApplicationError } from '../../../common/errors';
import { Product } from '../domain/product';
import { findProductById } from '../products.repository';

export class RestockProductCommand extends Command<{
	id: string;
}> {}

export const restockProductHandler = async (command: RestockProductCommand) => {
	const document = await findProductById(command.params.id);

	if (!document) {
		throw new ApplicationError('Provided product does not exist.');
	}

	const product = new Product(mapProductDocumentToEntity(document));

	await product.restock();
};
