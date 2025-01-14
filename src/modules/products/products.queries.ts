import { Query } from '../../common/cqrs/query';
import { getDatabase } from '../../mongodb/get_database';

export class GetProductsQuery extends Query {
	constructor() {
		super(null);
	}
}

export const getProductsHandler = async (query: GetProductsQuery) => {
	const db = await getDatabase();

	const cursor = db.collection('products').find();

	return await cursor.toArray();
};
