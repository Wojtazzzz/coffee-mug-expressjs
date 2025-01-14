import { getDbClient, getDatabase } from '../../mongodb/get_database';
import { type ClassPropertiesOnly } from '../../common/types';
import { Order } from './domain/order.entity';
import { PRODUCTS_COLLECTION_NAME } from '../products/products.repository';
import { ObjectId } from 'mongodb';
import { InfrastructureError } from '../../common/errors';

const ORDERS_COLLECTION_NAME = 'orders' as const;

export const createOrder = async (data: ClassPropertiesOnly<Order>) => {
	const client = await getDbClient();
	const session = client.startSession();

	session.startTransaction();

	try {
		const db = await getDatabase();

		await db.collection(ORDERS_COLLECTION_NAME).insertOne(data);
		await db.collection(PRODUCTS_COLLECTION_NAME).updateMany(
			{
				_id: {
					$in: data.products.map((product) => new ObjectId(product.id)),
				},
			},
			{
				$inc: {
					stock: -1,
				},
			},
		);

		await session.commitTransaction();
	} catch (error) {
		await session.abortTransaction();

		throw new InfrastructureError('Transaction aborted, order not created.');
	}

	session.endSession();
};
