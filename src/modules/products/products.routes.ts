import { Router } from 'express';
import { QueryBus } from '../../common/query_bus';
import { getProductsHandler, GetProductsQuery } from './products.queries';

const router = Router();
const queryBus = new QueryBus({
	GetProductsQuery: getProductsHandler,
});

router.get('/products', async (req, res, next) => {
	const query = new GetProductsQuery({
		page: Number(req.query.page),
	});

	const products = await queryBus.execute(query);

	res.json(products);
});

export { router as productsRouter };
