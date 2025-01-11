import { Query } from '../../common/query';

export class GetProductsQuery extends Query<{
	page: number;
}> {}

export const getProductsHandler = async (query: GetProductsQuery) => {
	// fetch data...

	return [
		{
			id: 1,
			name: 'Długopis',
		},
	];
};
