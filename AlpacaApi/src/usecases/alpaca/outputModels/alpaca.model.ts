import Alpaca from "../../../domain/Alpaca/Alpaca";

export type AlpacaOutput = {
  id?: number;
  name: string;
  color: string;
}

export default function alpacaModel(alpaca: Alpaca): AlpacaOutput {
  return {
    id: alpaca.id,
    name: `Super ${alpaca.name}`,
    color: alpaca.color,
  }
}