import { BaseEntity } from '../../../common/entity';
import { IsString, Length, IsNumber, IsPositive } from 'class-validator';
import { getDatabase } from '../../../mongodb/getDatabase';
import { DomainError } from '../../../common/errors';

export class Product extends BaseEntity {
	@IsString()
	@Length(1, 50)
	name: string;

	@IsString()
	@Length(1, 50)
	description: string;

	@IsNumber()
	@IsPositive()
	price: number;

	@IsNumber()
	@IsPositive()
	stock: number;

	constructor(properties: Partial<Product>) {
		super();
		Object.assign(this, properties);
	}

	async create() {
		const db = await getDatabase();

		if (!this.validate()) {
			throw new DomainError(
				'Product cannot be created.',
				this.validationErrors,
			);
		}

		db.collection('products').insertOne({
			name: this.name,
			description: this.description,
			price: this.price,
			stock: this.stock,
		});
	}
}
