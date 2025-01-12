export abstract class Query<Params = null> {
	constructor(public readonly params: Params) {}
}
