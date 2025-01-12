import { Query } from '../../common/query';
import { getDatabase } from '../../mongodb/getDatabase';

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
