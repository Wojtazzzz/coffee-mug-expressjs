import { type Document, type WithId } from 'mongodb';

export const mapProductDocumentToDto = (product: WithId<Document>) => ({
	id: String(product._id),
	title: product.name,
	description: product.description,
	price: product.price,
	stock: product.stock,
});

export const mapProductDocumentToEntity = (product: WithId<Document>) => ({
	id: String(product._id),
	title: product.name,
	description: product.description,
	price: product.price,
	stock: product.stock,
});
