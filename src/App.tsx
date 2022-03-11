import { useEffect } from 'react';

import { useCountriesContext } from './countries/hooks/useCountriesContext';
import { Country } from './countries/model/Country';
import { AxiosCountriesFetcher } from './countries/axios/countriesApiCalls';
import { CountriesActionTypes } from './countries/types/countriesTypes';
import Form from './components/Form';
import Card from './components/Card';
import Detail from './components/Detail';

function App() {
  const { state } = useCountriesContext();

  return (
    <main className='px-6 bg-very-light-gray-background'>
      <Form />
      {state.loading ? (
        <p>Loading...</p>
      ) : state.errorMessage ? (
        <p>{state.errorMessage}</p>
      ) : (
        state.countries.map((country) => (
          <Card key={country.tld[0]} country={country} />
        ))
      )}
    </main>
  );
}

export default App;
