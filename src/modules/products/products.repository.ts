import { ObjectId } from 'mongodb';
import { getDatabase } from '../../mongodb/get_database';
import { type Product } from './domain/product';
import { type ClassPropertiesOnly } from '../../common/types';

const COLLECTION_NAME = 'products' as const;

export const getAllProducts = async () => {
	const db = await getDatabase();

	return await db.collection(COLLECTION_NAME).find().toArray();
};

export const findProductById = async (id: string) => {
	const db = await getDatabase();

	return await db.collection(COLLECTION_NAME).findOne({
		_id: ObjectId.createFromHexString(id),
	});
};

export const createProduct = async (data: ClassPropertiesOnly<Product>) => {
	const db = await getDatabase();

	return await db.collection(COLLECTION_NAME).insertOne(data);
};

export const increaseProductStock = async (id: string) => {
	const db = await getDatabase();

	return await db.collection(COLLECTION_NAME).findOneAndUpdate(
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

	return await db.collection(COLLECTION_NAME).findOneAndUpdate(
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
