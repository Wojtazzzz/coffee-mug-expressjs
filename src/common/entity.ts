import { validateSync } from 'class-validator';

export abstract class BaseEntity {
	protected validationErrors: string[] = [];

	validate() {
		const errors = validateSync(this);

		if (errors.length > 0) {
			this.validationErrors = errors
				.flatMap((error) => Object.values(error.constraints ?? {}))
				.filter((message) => message.length > 0);

			return false;
		}

		return true;
	}
}
