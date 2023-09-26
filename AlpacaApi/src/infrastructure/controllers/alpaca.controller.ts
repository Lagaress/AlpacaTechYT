import { Request, Response } from 'express';
import { AlpacaCreatedOk, AlpacaDeletedOk, AlpacaRetrievedOk, AlpacaUpdatedOk, AlpacasRetrievedOk } from './apiResponses';
import * as alpacaUsecase from '../../usecases/alpaca/alpaca.usecase'

export const createAlpaca = async (req: Request, res: Response) => {
  const payload = req.body as alpacaUsecase.CreateAlpacaPayload;
  try {
    const alpaca = await alpacaUsecase.createAlpaca(payload);
    res.json({ response: AlpacaCreatedOk, data: alpaca });  
  } catch(error) {
    res.json({ response: error });
  }
}

export const getAlpacas = async (req: Request, res: Response) => {
  try {
    const alpacas = await alpacaUsecase.getAlpacas();
    res.json({ response: AlpacasRetrievedOk, data: alpacas });  
  } catch(error) {
    res.json({ response: error });
  }
}

export const getAlpaca = async (req: Request, res: Response) => {
  const alpacaId: number = parseInt(req.params.alpacaId);
  try {
    const alpaca = await alpacaUsecase.getAlpaca(alpacaId);
    res.json({ response: AlpacaRetrievedOk, data: alpaca });  
  } catch(error) {
    res.json({ response: error });
  }
}

export const updateAlpaca = async (req: Request, res: Response) => {
  const alpacaId: number = parseInt(req.params.alpacaId);
  const payload = req.body as alpacaUsecase.UpdateAlpacaPayload;
  try {
    await alpacaUsecase.updateAlpaca(alpacaId, payload);
    res.json({ response: AlpacaUpdatedOk });  
  } catch(error) {
    res.json({ response: error });
  }
}

export const deleteAlpaca = async (req: Request, res: Response) => {
  const alpacaId: number = parseInt(req.params.alpacaId);
  try {
    await alpacaUsecase.deleteAlpaca(alpacaId);
    res.json({ response: AlpacaDeletedOk });  
  } catch(error) {
    res.json({ response: error });
  }
}