export class DomainError extends Error {
	readonly errors: string[];

	constructor(message: string, errors: string[]) {
		super(message);

		this.errors = errors;
	}
}

export class ApplicationError extends Error {
	readonly errors: string[];

	constructor(message: string) {
		super(message);
	}
}
