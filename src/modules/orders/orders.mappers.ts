import { ClassPropertiesOnly } from '../../common/types';
import { type Product } from '../products/domain/product';

export const mapProductEntityToOrderProduct = (
	product: ClassPropertiesOnly<Product>,
) => ({
	id: String(product.id),
	price: product.price,
});
