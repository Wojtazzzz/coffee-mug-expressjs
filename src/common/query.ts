export abstract class Query<Params> {
	constructor(public readonly params: Params) {}
}
