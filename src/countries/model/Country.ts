import {
  CountriesFetcher,
  CountryType,
  SelectedCountryType,
} from '../types/countriesTypes';

export class Country {
  private list: CountryType[];
  private selected: SelectedCountryType = {} as SelectedCountryType;

  constructor() {
    this.list = [];
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

    this.selected = {
      name: {
        common,
        official,
        nativeName: this.getNativeNameArray(nativeName),
      },
      currencies: this.getCurrenciesArray(currencies),
      languages: this.getLanguagesArray(languages),
      borders: await this.getBorderCountries(borders, countriesFetcher),
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
    const nativeNameArray = [];

    for (const n in nativeName) {
      nativeNameArray.push(nativeName[n].common);
    }

    nativeNameArray.map((n, index) =>
      index < nativeNameArray.length - 1 ? `${n}, ` : n,
    );

    return nativeNameArray;
  }

  getCurrenciesArray = (currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  }): string[] => {
    const currenciesArray = [];

    for (const currency in currencies) {
      currenciesArray.push(currencies[currency].name);
    }

    currenciesArray.map((currency, index) =>
      index < currenciesArray.length - 1 ? `${currency}, ` : currency,
    );

    return currenciesArray;
  };

  getLanguagesArray = (languages: { [key: string]: string }): string[] => {
    const languagesArray = [];

    for (const language in languages) {
      languagesArray.push(languages[language]);
    }

    languagesArray.map((language, index) =>
      index < languagesArray.length - 1 ? `${language}, ` : language,
    );

    return languagesArray;
  };

  async getBorderCountries(
    borders: string[],
    countriesFetcher: CountriesFetcher,
  ): Promise<CountryType[]> {
    const bordersCsv = borders.toString();
    const borderCountries = await countriesFetcher.fetch(
      `/alpha?codes=${bordersCsv}`,
    );

    return borderCountries;
  }
}
