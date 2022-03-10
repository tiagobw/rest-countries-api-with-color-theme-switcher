import { countriesAxios } from './countriesConfiguration';
import { CountriesFetcher, CountryType } from '../types/countriesTypes';

class AxiosCountriesFetcher implements CountriesFetcher {
  async fetch(url: string) {
    const response = await countriesAxios.get(url);
    const countries: CountryType[] = response.data;
    return countries;
  }
}

export { AxiosCountriesFetcher };
