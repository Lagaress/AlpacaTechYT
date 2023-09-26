type AlpacaParams = {
  id?: number;
  name: string;
  color: string;
}

export default class Alpaca {
  public id?: number;
  public name: string;
  public color: string;

  public constructor(alpaca: AlpacaParams) {
    this.id = alpaca.id;
    this.name = alpaca.name;
    this.color = alpaca.color;
  }
}