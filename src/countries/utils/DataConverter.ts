import {
  CountriesDataConverter,
  CountriesFetcher,
  CountryType,
} from '../types/countriesTypes';

export class DataConverter implements CountriesDataConverter {
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
