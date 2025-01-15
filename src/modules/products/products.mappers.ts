import { type Document, type WithId } from 'mongodb';
import { Product } from './domain/product.entity';
import { ClassPropertiesOnly } from '../../common/types';

export const mapProductDocumentToDto = (product: WithId<Document>) =>
	({
		id: String(product._id),
		name: product.name,
		description: product.description,
		price: product.price,
		stock: product.stock,
	}) satisfies ClassPropertiesOnly<Product>;

export const mapProductDocumentToEntity = (product: WithId<Document>) =>
	({
		id: String(product._id),
		name: product.name,
		description: product.description,
		price: product.price,
		stock: product.stock,
	}) satisfies ClassPropertiesOnly<Product>;
