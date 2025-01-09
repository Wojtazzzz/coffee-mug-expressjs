import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { productsRouter } from './src/modules/products/products.routes';

const app = express();

app.listen(3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(productsRouter);

export default app;
