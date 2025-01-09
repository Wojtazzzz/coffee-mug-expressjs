import { Query } from '../../common/query';

export class GetProductsQuery implements Query {
	constructor(public readonly page: number) {}
}

export const getProductsHandler = async (query: GetProductsQuery) => {
	// fetch data...

	return [
		{
			id: 1,
			name: 'Długopis',
		},
	];
};
