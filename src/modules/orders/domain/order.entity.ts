import { BaseEntity } from '../../../common/entity';
import {
	IsString,
	IsOptional,
	IsNotEmpty,
	IsArray,
	ValidateNested,
} from 'class-validator';
import { DomainError } from '../../../common/errors';
import { Type } from 'class-transformer';
import { createOrder } from '../orders.repository';
import { type Product } from '../../products/domain/product.entity';
import 'reflect-metadata';
import { mapProductEntityToOrderProduct } from '../orders.mappers';
import { OrderProductDto } from '../orders.dtos';
import { ClassPropertiesOnly } from '../../../common/types';

export class Order extends BaseEntity {
	@IsString()
	@IsOptional()
	id?: string;

	@IsString()
	@IsNotEmpty()
	customerId: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderProductDto)
	products: OrderProductDto[];

	constructor(properties: Partial<Order>) {
		super();
		Object.assign(this, properties);
	}

	async create(products: ClassPropertiesOnly<Product>[]) {
		const productsWithTooLowStock = products.filter(
			(product) => product.stock <= 0,
		);

		if (productsWithTooLowStock.length > 0) {
			throw new DomainError(
				'Order cannot be created.',
				productsWithTooLowStock.map(
					(product) => `Product "${product.id}" is out of stock.`,
				),
			);
		}

		this.products = products.map(mapProductEntityToOrderProduct);

		if (this.products.length <= 0) {
			throw new DomainError('Cannot create order without products.');
		}

		if (!this.validate()) {
			throw new DomainError('Order cannot be created.', this.validationErrors);
		}

		await createOrder({
			customerId: this.customerId,
			products: this.products,
		});
	}
}
