import {
  CountriesDataConverter,
  CountriesFetcher,
  CountryType,
  SelectedCountryType,
} from '../types/countriesTypes';

export class Country {
  private list: CountryType[];
  private selected: SelectedCountryType = {} as SelectedCountryType;
  private dataConverter: CountriesDataConverter;

  constructor(dataConverter: CountriesDataConverter) {
    this.list = [];
    this.dataConverter = dataConverter;
  }

  async fetch(countriesFetcher: CountriesFetcher, url: string) {
    this.list = await countriesFetcher.fetch(url);
  }

  getList(quantity: number) {
    return this.list.slice(0, quantity);
  }

  async getSelected(
    country: CountryType,
    countriesFetcher: CountriesFetcher,
  ): Promise<SelectedCountryType> {
    const {
      flags,
      name: { common, official, nativeName },
      currencies,
      languages,
      borders,
      population,
      region,
      subregion,
      capital,
      tld,
    } = country;

    let borderCountries: CountryType[] | null = null;

    if (borders) {
      borderCountries = await this.getBorderCountries(
        borders,
        countriesFetcher,
      );
    }

    this.selected = {
      flags,
      name: {
        common,
        official,
        nativeName: this.getNativeNameArray(nativeName),
      },
      currencies: this.getCurrenciesArray(currencies),
      languages: this.getLanguagesArray(languages),
      borders: borderCountries,
      population,
      region,
      subregion,
      capital,
      tld,
    };

    return this.selected;
  }

  getNativeNameArray(nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  }): string[] {
    return this.dataConverter.getNativeNameArray(nativeName);
  }

  getCurrenciesArray = (currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  }): string[] => {
    return this.dataConverter.getCurrenciesArray(currencies);
  };

  getLanguagesArray = (languages: { [key: string]: string }): string[] => {
    return this.dataConverter.getLanguagesArray(languages);
  };

  async getBorderCountries(
    borders: string[],
    countriesFetcher: CountriesFetcher,
  ): Promise<CountryType[]> {
    const countries = await this.dataConverter.getBorderCountries(
      borders,
      countriesFetcher,
    );

    return countries;
  }
}
