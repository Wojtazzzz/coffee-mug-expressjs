import { ObjectId } from 'mongodb';
import { getDatabase } from '../../mongodb/get_database';
import { type Product } from './domain/product.entity';
import { type ClassPropertiesOnly } from '../../common/types';
import { InfrastructureError } from '../../common/errors';

export const PRODUCTS_COLLECTION_NAME = 'products' as const;

export const getAllProducts = async () => {
	const db = await getDatabase();

	return await db.collection(PRODUCTS_COLLECTION_NAME).find().toArray();
};

export const getProductsByIds = async (ids: string[]) => {
	const db = await getDatabase();

	return await db
		.collection(PRODUCTS_COLLECTION_NAME)
		.find({
			_id: {
				$in: ids.map((id) => new ObjectId(id)),
			},
		})
		.toArray();
};

export const findProductById = async (id: string) => {
	const db = await getDatabase();

	if (!ObjectId.isValid(id)) {
		throw new InfrastructureError('Passed invalid product id.');
	}

	return await db.collection(PRODUCTS_COLLECTION_NAME).findOne({
		_id: new ObjectId(id),
	});
};

export const createProduct = async (data: ClassPropertiesOnly<Product>) => {
	const db = await getDatabase();

	return await db.collection(PRODUCTS_COLLECTION_NAME).insertOne(data);
};

export const increaseProductStock = async (id: string) => {
	const db = await getDatabase();

	if (!ObjectId.isValid(id)) {
		throw new InfrastructureError('Passed invalid product id.');
	}

	return await db.collection(PRODUCTS_COLLECTION_NAME).findOneAndUpdate(
		{
			_id: new ObjectId(id),
		},
		{
			$inc: {
				stock: 1,
			},
		},
	);
};

export const decreaseProductStock = async (id: string) => {
	const db = await getDatabase();

	if (!ObjectId.isValid(id)) {
		throw new InfrastructureError('Passed invalid product id.');
	}

	return await db.collection(PRODUCTS_COLLECTION_NAME).findOneAndUpdate(
		{
			_id: new ObjectId(id),
		},
		{
			$inc: {
				stock: -1,
			},
		},
	);
};
