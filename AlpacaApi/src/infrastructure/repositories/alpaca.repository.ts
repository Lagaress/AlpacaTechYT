import mysql, { OkPacketParams } from 'mysql2';
import config from '../../config';
import Alpaca from '../../domain/Alpaca/Alpaca';

const db = mysql.createConnection({
  host: config.DATABASE.HOST,
  user: config.DATABASE.USER,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE,
})

type DbAlpaca = {
  id?: number;
  name: string;
  color: string;
}

export const create = async (alpaca: Alpaca): Promise<Alpaca> => {
  const [dbAlpaca] = await db.promise().query('INSERT INTO alpaca SET ?', adapt(alpaca)) as OkPacketParams[]; 
  alpaca.id = dbAlpaca.insertId;
  console.log(alpaca);
  return alpaca;
}

export const getAll = async(): Promise<Alpaca[]> => {
  const [dbAlpacas] = await db.promise().query('SELECT * FROM alpaca') as unknown as DbAlpaca[][];
  return dbAlpacas.map(restore);
}

export const get = async (alpacaId: number): Promise<Alpaca | null> => {
  const [dbAlpaca] = await db.promise().query('SELECT * FROM alpaca WHERE id = ?', [alpacaId]) as unknown as DbAlpaca[][];
  return dbAlpaca[0] ? restore(dbAlpaca[0]) : null;
}

export const update = async (alpaca: Alpaca): Promise<void> => {
  await db.promise().query('UPDATE alpaca SET ? WHERE id = ?', [adapt(alpaca), alpaca.id]);
}

export const deleteAlpaca = async (alpacaId: number): Promise<void> => {
  await db.promise().query('DELETE FROM alpaca WHERE id = ?', [alpacaId]);
}

const adapt = (alpaca: Alpaca): DbAlpaca => {
  return {
    id: alpaca.id,
    name: alpaca.name,
    color: alpaca.color,
  }
}

const restore = (dbAlpaca: DbAlpaca): Alpaca => {
  return new Alpaca({
    id: dbAlpaca.id,
    name: dbAlpaca.name,
    color: dbAlpaca.color,
  })
}