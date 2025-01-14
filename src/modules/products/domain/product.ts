import { BaseEntity } from '../../../common/entity';
import {
	IsString,
	Length,
	IsNumber,
	IsOptional,
	Min,
	Validate,
} from 'class-validator';
import { DomainError } from '../../../common/errors';
import {
	createProduct,
	decreaseProductStock,
	increaseProductStock,
} from '../products.repository';
import { ValidObjectId } from '../../../common/validators';

export class Product extends BaseEntity {
	@IsString()
	@IsOptional()
	@Validate(ValidObjectId)
	id?: string;

	@IsString()
	@Length(1, 50)
	name: string;

	@IsString()
	@Length(1, 50)
	description: string;

	@IsNumber()
	@Min(0)
	price: number;

	@IsNumber()
	@Min(0)
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

		await increaseProductStock(this.id);
	}

	async sell() {
		if (!this.validate()) {
			throw new DomainError('Cannot sell this product.', this.validationErrors);
		}

		if (!this.id) {
			throw new DomainError('Cannot sell not existing product.', []);
		}

		if (this.stock < 1) {
			throw new DomainError('Cannot sell product with stock below 1.', []);
		}

		await decreaseProductStock(this.id);
	}
}
