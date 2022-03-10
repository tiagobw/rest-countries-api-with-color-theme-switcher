export type CountryType = {
  name: {
    common: 'string';
    official: 'string';
  };
};

export interface CountriesFetcher {
  fetch: (url: string) => Promise<CountryType[]>;
}

export type CountriesState = {
  countries: CountryType[];
};

export enum CountriesActionTypes {
  Fetch = 'FETCH_COUNTRIES',
}

export type CountriesActions = {
  type: CountriesActionTypes.Fetch;
  payload: CountryType[];
};
