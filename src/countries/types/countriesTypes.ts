export type CountryType = {
  flags: {
    png: string;
    svg: string;
  };
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
  borders?: string[] | null;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld?: string[];
};

export type SelectedCountryType = {
  flags: {
    png: string;
    svg: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: string[];
  };
  currencies: string[];
  languages: string[];
  borders: CountryType[] | null;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld?: string[];
};

export interface CountriesFetcher {
  fetch: (url: string) => Promise<CountryType[]>;
}

export interface CountriesDataConverter {
  getNativeNameArray: (nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  }) => string[];

  getCurrenciesArray: (currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  }) => string[];

  getLanguagesArray: (languages: { [key: string]: string }) => string[];

  getBorderCountries: (
    borders: string[],
    countriesFetcher: CountriesFetcher,
  ) => Promise<CountryType[]>;
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
