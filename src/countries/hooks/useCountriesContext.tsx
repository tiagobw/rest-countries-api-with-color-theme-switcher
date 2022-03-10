import { useContext } from 'react';
import { CountriesContext } from '../context/CountriesContext';

export const useCountriesContext = () => {
  return useContext(CountriesContext);
};
