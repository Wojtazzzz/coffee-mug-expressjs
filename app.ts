import express from "express";
import cookieParser from 'cookie-parser';
import { router } from './routes/index';
import logger from 'morgan';

const app = express();

app.listen(3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

export default app;
