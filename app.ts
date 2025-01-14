import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { productsRouter } from './src/modules/products/products.routes';
import { errorHandler } from './src/common/error_handler';
import { ordersRouter } from './src/modules/orders/orders.routes';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use(errorHandler);

app.listen(3000);

export default app;
