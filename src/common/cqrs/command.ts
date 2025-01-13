export abstract class Command<Params = null> {
	constructor(public readonly params: Params) {}
}
