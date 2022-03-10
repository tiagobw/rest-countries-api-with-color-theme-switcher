import { createContext, useReducer } from 'react';

import { countriesReducer } from './countriesReducer';
import { CountriesActions, CountriesState } from '../types/countriesTypes';

const initialState: CountriesState = {
  countries: [],
  loading: false,
  errorMessage: ''
};

const CountriesContext = createContext<{
  state: CountriesState;
  dispatch: React.Dispatch<CountriesActions>;
}>({ state: initialState, dispatch: () => null });

type CountriesProviderProps = {
  children: React.ReactNode;
};

const CountriesProvider = ({ children }: CountriesProviderProps) => {
  const [state, dispatch] = useReducer(countriesReducer, initialState);

  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
};

export { CountriesContext, CountriesProvider };
