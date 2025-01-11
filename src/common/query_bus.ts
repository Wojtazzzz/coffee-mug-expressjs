import { Query } from './query';

type QueryHandlersMap<R> = Record<
	string,
	{
		query: Query<any>;
		result: R;
	}
>;

type QueryHandler<TQuery extends Query<any>, TResult> = (
	query: TQuery,
) => Promise<TResult>;

export class QueryBus<ReturnType> {
	constructor(
		private handlers: {
			[K in keyof QueryHandlersMap<ReturnType>]: QueryHandler<
				QueryHandlersMap<ReturnType>[K]['query'],
				QueryHandlersMap<ReturnType>[K]['result']
			>;
		},
	) {}

	async execute<QueryName extends keyof QueryHandlersMap<ReturnType>>(
		query: QueryHandlersMap<ReturnType>[QueryName]['query'],
	) {
		const queryName = query.constructor.name;

		const handler = this.handlers[queryName];

		if (!handler) {
			throw new Error(`No handler found for query '${queryName}'.`);
		}

		return await handler(query);
	}
}
