export type CountryType = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[];
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
};

export interface CountriesFetcher {
  fetch: (url: string) => Promise<CountryType[]>;
}

export type CountriesState = {
  countries: CountryType[];
  loading: boolean;
};

export enum CountriesActionTypes {
  Fetch = 'FETCH_COUNTRIES',
  Loading = 'LOADING',
}

export type CountriesActions =
  | {
      type: CountriesActionTypes.Fetch;
      payload: {
        countries: CountryType[];
        loading: boolean;
      };
    }
  | {
      type: CountriesActionTypes.Loading;
    };
