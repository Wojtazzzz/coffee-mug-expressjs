import { BaseEntity } from '../../../common/entity';
import {
	IsString,
	Length,
	IsNumber,
	IsPositive,
	IsOptional,
} from 'class-validator';
import { DomainError } from '../../../common/errors';
import { createProduct, restockProduct } from '../products.repository';

export class Product extends BaseEntity {
	@IsString()
	@IsOptional()
	id?: string;

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
		if (!this.validate()) {
			throw new DomainError(
				'Product cannot be created.',
				this.validationErrors,
			);
		}

		await createProduct({
			name: this.name,
			description: this.description,
			price: this.price,
			stock: this.stock,
		});
	}

	async restock() {
		if (!this.validate()) {
			throw new DomainError(
				'Cannot restock this product.',
				this.validationErrors,
			);
		}

		if (!this.id) {
			throw new DomainError('Cannot restock not existing product.', []);
		}

		await restockProduct(this.id);
	}
}
