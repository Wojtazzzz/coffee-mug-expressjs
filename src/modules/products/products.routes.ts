import { Router } from 'express';
import { QueryBus } from '../../common/query_bus';
import { GetProductsQuery } from './products.queries';

const router = Router();
const queryBus = new QueryBus();

router.get('/products', async (req, res, next) => {
	const query = new GetProductsQuery(Number(req.query.page));

	const products = await queryBus.execute(query);

	res.json(products);
});

export { router as productsRouter };
