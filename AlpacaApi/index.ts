import express from 'express';
import config from './src/config';
import router from './src/infrastructure/routes/alpaca.route';
const app = express()

app.use(express.json());
app.use('/', router);

app.listen(config.SERVER.PORT);