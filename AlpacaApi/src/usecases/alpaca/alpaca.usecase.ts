import logger from 'pino';
import { AlpacaNotFound } from '../../infrastructure/controllers/apiExceptions';
import alpacaModel, { AlpacaOutput } from './outputModels/alpaca.model';
import * as alpacaRepository from '../../infrastructure/repositories/alpaca.repository'
import Alpaca from '../../domain/Alpaca/Alpaca';

export type CreateAlpacaPayload = Pick<Alpaca, 'name' | 'color'>;
export type UpdateAlpacaPayload = Pick<Alpaca, 'name'>;

export const createAlpaca = async (payload: CreateAlpacaPayload): Promise<AlpacaOutput> => {
  const childLog = logger().child({ payload });
  childLog.info('Creating an alpaca');

  const alpaca = await alpacaRepository.create(
    new Alpaca({
      ...payload,
    })
  );

  console.log(alpaca);

  childLog.info('Alpaca created successfully');
  return alpacaModel(alpaca);
}

export const getAlpacas = async (): Promise<AlpacaOutput[]> => {
  const childLog = logger().child({});
  childLog.info('Getting all alpacas');

  const alpacas = await alpacaRepository.getAll();

  childLog.info('Alpacas retrieved successfully');
  return alpacas.map(alpacaModel);
}

export const getAlpaca = async (alpacaId: number): Promise<AlpacaOutput> => {
  const childLog = logger().child({ alpacaId });
  childLog.info('Getting an alpaca');

  const alpaca = await alpacaRepository.get(alpacaId);
  if (!alpaca) {
    childLog.info('Alpaca not found');
    throw AlpacaNotFound;
  }

  childLog.info('Alpaca retrieved successfully');
  return alpacaModel(alpaca);
}

export const updateAlpaca = async (alpacaId: number, payload: UpdateAlpacaPayload): Promise<void> => {
  const childLog = logger().child({ alpacaId, payload });
  childLog.info('Updating an alpaca');

  const alpaca = await alpacaRepository.get(alpacaId);
  if (!alpaca) {
    childLog.info('Alpaca not found');
    throw AlpacaNotFound;
  }

  // TODO: Implement update method in domain entity
  alpaca.name = payload.name;
  await alpacaRepository.update(alpaca);

  childLog.info('Alpaca updated successfully');
}

export const deleteAlpaca = async (alpacaId: number): Promise<void> => {
  const childLog = logger().child({ alpacaId });
  childLog.info('Deleting an alpaca');

  const alpaca = await alpacaRepository.get(alpacaId);
  if (alpaca) {
    alpacaRepository.deleteAlpaca(alpacaId);
  }

  childLog.info('Alpaca deleted successfully');
}