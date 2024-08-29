import { config } from 'dotenv';
config();
import './db';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiV1Routes from './routes';
import respond from './utils/respond.util';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/v1', apiV1Routes);
app.use('*', (req, res) => {
    respond({ res, status: 404, message: '404 not found!' });
});

app.listen(port, () => {
    console.log('Server started');
});
