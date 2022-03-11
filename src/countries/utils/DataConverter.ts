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

    return nativeNameArray.map((n, index) =>
      index < nativeNameArray.length - 1 ? `${n}, ` : n,
    );
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

    return currenciesArray.map((currency, index) =>
      index < currenciesArray.length - 1 ? `${currency}, ` : currency,
    );
  };

  getLanguagesArray = (languages: { [key: string]: string }): string[] => {
    const languagesArray = [];

    for (const language in languages) {
      languagesArray.push(languages[language]);
    }

    return languagesArray.map((language, index) =>
      index < languagesArray.length - 1 ? `${language}, ` : language,
    );
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
