import { useEffect } from 'react';

import { useCountriesContext } from './countries/context/useCountriesContext';
import { Country } from './countries/model/Country';
import { AxiosCountriesFetcher } from './countries/axios/countriesApiCalls';
import { CountriesActionTypes } from './countries/types/countriesTypes';
import Form from './components/Form';

function App() {
  const { state, dispatch } = useCountriesContext();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const country = new Country();
        dispatch({
          type: CountriesActionTypes.Loading,
        });
        await country.fetch(new AxiosCountriesFetcher(), '/region/americas');
        dispatch({
          type: CountriesActionTypes.Fetch,
          payload: { countries: country.getList(8) },
        });
        console.log(state.countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <main className='px-6 bg-very-light-gray-background'>
      <Form />
      {state.loading ? (
        <p>Loading...</p>
      ) : (
        state.countries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))
      )}
    </main>
  );
}

export default App;
