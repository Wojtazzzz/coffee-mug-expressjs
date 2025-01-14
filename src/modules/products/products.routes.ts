import { Router } from 'express';
import { QueryBus } from '../../common/cqrs/query_bus';
import { mapProductDocumentToDto } from './products.mappers';
import { CommandBus } from '../../common/cqrs/command_bus';
import { validateRequest } from '../../common/validate_request';
import { CreateProductRequest } from './products.dtos';
import { requestHandler } from '../../common/request_handler';
import {
	CreateProductCommand,
	createProductHandler,
} from './commands/create_product.command';
import {
	RestockProductCommand,
	restockProductHandler,
} from './commands/restock_product.command';
import {
	getProductsHandler,
	GetProductsQuery,
} from './queries/get_products.query';

const router = Router();

const queryBus = new QueryBus({
	GetProductsQuery: getProductsHandler,
});

const commandBus = new CommandBus({
	CreateProductCommand: createProductHandler,
	RestockProductCommand: restockProductHandler,
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

router.post(
	'/:id/restock',
	requestHandler(async (req, res, next) => {
		const command = new RestockProductCommand({
			id: String(req.params.id),
		});

		await commandBus.execute(command);

		res.status(204).json({});
	}),
);

export { router as productsRouter };
