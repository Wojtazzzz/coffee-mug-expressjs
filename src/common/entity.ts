import { validateSync } from 'class-validator';

export class BaseEntity {
	validate() {
		const errors = validateSync(this, {
			skipMissingProperties: true,
		});

		return errors.length <= 0;
	}
}
