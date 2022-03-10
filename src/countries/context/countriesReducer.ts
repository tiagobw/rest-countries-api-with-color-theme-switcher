import {
  CountriesState,
  CountriesActions,
  CountriesActionTypes,
} from '../types/countriesTypes';

export const countriesReducer = (
  state: CountriesState,
  action: CountriesActions,
) => {
  switch (action.type) {
    case CountriesActionTypes.Fetch:
      return {
        ...state,
        countries: action.payload.countries,
        loading: action.payload.loading,
      };
    case CountriesActionTypes.Loading:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
