import { useEffect } from 'react';

import { useCountriesContext } from './countries/context/useCountriesContext';
import { Country } from './countries/model/Country';
import { AxiosCountriesFetcher } from './countries/axios/countriesApiCalls';
import { CountriesActionTypes } from './countries/types/countriesTypes';

function App() {
  const { dispatch, state } = useCountriesContext();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const country = new Country();
        await country.fetch(new AxiosCountriesFetcher(), '/region/americas');
        dispatch({ type: CountriesActionTypes.Fetch, payload: country.getList(8) });
        console.log(country.getList(8));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      {state.countries.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
}

export default App;
