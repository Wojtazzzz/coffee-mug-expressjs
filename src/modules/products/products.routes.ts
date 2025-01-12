import { Router } from 'express';
import { QueryBus } from '../../common/query_bus';
import { getProductsHandler, GetProductsQuery } from './products.queries';
import { mapProductDocumentToDto } from './products.mappers';

const router = Router();
const queryBus = new QueryBus({
	GetProductsQuery: getProductsHandler,
});

router.get('/', async (req, res) => {
	const query = new GetProductsQuery();

	const products = await queryBus.execute(query);

	res.json(products.map(mapProductDocumentToDto));
});

export { router as productsRouter };
