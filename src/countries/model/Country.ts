import { CountriesFetcher, CountryType } from '../types/countriesTypes';

export class Country {
  private list: CountryType[];

  constructor() {
    this.list = [];
  }

  async fetch(countriesFetcher: CountriesFetcher, url: string) {
    this.list = await countriesFetcher.fetch(url);
  }

  getList(quantity: number) {
    return this.list.slice(0, quantity);
  }
}
