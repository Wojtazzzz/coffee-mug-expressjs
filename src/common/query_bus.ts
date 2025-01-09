import { Query } from './query';
import {
	getProductsHandler,
	GetProductsQuery,
} from '../modules/products/products.queries';

export class QueryBus {
	private handlers = new Map<string, Function>();

	constructor() {
		this.handlers.set(GetProductsQuery.name, getProductsHandler);
	}

	async execute(query: Query) {
		const handler = this.handlers.get(query.constructor.name);

		if (!handler) {
			throw new Error(`No handler found for query: ${query.constructor.name}`);
		}

		return await handler(query);
	}
}
