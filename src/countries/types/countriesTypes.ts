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

export type SelectedCountryType = {
  name: {
    common: string;
    official: string;
    nativeName: string[];
  };
  currencies: string[];
  languages: string[];
  borders: CountryType[];
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
  errorMessage: string;
};

export enum CountriesActionTypes {
  Fetch = 'FETCH_COUNTRIES',
  Error = 'ERROR',
  Loading = 'LOADING',
  StopLoading = 'STOP_LOADING',
}

export type CountriesActions =
  | {
      type: CountriesActionTypes.Fetch;
      payload: {
        countries: CountryType[];
      };
    }
  | {
      type: CountriesActionTypes.Error;
      payload: {
        errorMessage: string;
      };
    }
  | {
      type: CountriesActionTypes.Loading;
    }
  | {
      type: CountriesActionTypes.StopLoading;
    };
