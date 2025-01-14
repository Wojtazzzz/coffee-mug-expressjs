import { Router } from 'express';
import { QueryBus } from '../../common/cqrs/query_bus';
import { getProductsHandler, GetProductsQuery } from './products.queries';
import { mapProductDocumentToDto } from './products.mappers';
import {
	CreateProductCommand,
	createProductHandler,
} from './products.commands';
import { CommandBus } from '../../common/cqrs/command_bus';
import { validateRequest } from '../../common/validateRequest';
import { CreateProductRequest } from './products.dtos';
import { requestHandler } from '../../common/requestHandler';

const router = Router();

const queryBus = new QueryBus({
	GetProductsQuery: getProductsHandler,
});

const commandBus = new CommandBus({
	CreateProductCommand: createProductHandler,
});

router.get(
	'/',
	requestHandler(async (req, res, next) => {
		const query = new GetProductsQuery();

		const products = await queryBus.execute(query);

		res.json(products.map(mapProductDocumentToDto));
	}),
);

router.post(
	'/',
	validateRequest(CreateProductRequest),
	requestHandler(async (req, res, next) => {
		const command = new CreateProductCommand(req.body);

		await commandBus.execute(command);

		res.status(201).json({});
	}),
);

export { router as productsRouter };
