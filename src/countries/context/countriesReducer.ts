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
        loading: false,
        errorMessage: '',
      };
    case CountriesActionTypes.Loading:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case CountriesActionTypes.StopLoading:
      return {
        ...state,
        loading: false,
        errorMessage: '',
      };
    case CountriesActionTypes.Error:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
