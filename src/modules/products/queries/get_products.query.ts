import { Query } from '../../../common/cqrs/query';
import { getAllProducts } from '../products.repository';

export class GetProductsQuery extends Query {
	constructor() {
		super(null);
	}
}

export const getProductsHandler = async (query: GetProductsQuery) => {
	return await getAllProducts();
};
