import { Router } from 'express';
import { CommandBus } from '../../common/cqrs/command_bus';
import { validateRequest } from '../../common/validate_request';
import { requestHandler } from '../../common/request_handler';
import {
	CreateOrderCommand,
	createOrderHandler,
} from './commands/create_order.command';
import { CreateOrderRequest } from './orders.dtos';

const router = Router();

const commandBus = new CommandBus({
	CreateOrderCommand: createOrderHandler,
});

router.post(
	'/',
	validateRequest(CreateOrderRequest),
	requestHandler(async (req, res, next) => {
		const command = new CreateOrderCommand(req.body);

		await commandBus.execute(command);

		res.status(201).json({});
	}),
);

export { router as ordersRouter };
