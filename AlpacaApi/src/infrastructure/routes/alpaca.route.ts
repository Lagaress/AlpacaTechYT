import express from 'express';
import * as alpacaController from '../controllers/alpaca.controller'
const router = express.Router();

router.post('/alpacas', alpacaController.createAlpaca);
router.get('/alpacas', alpacaController.getAlpacas);
router.get('/alpacas/:alpacaId', alpacaController.getAlpaca);
router.patch('/alpacas/:alpacaId', alpacaController.updateAlpaca);
router.delete('/alpacas/:alpacaId', alpacaController.deleteAlpaca);

export default router;