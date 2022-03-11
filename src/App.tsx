import { useCountriesContext } from './countries/hooks/useCountriesContext';
import { Country } from './countries/model/Country';
import { AxiosCountriesFetcher } from './countries/axios/countriesApiCalls';
import { CountriesActionTypes } from './countries/types/countriesTypes';
import Form from './components/Form';
import Card from './components/Card';
import Detail from './components/Detail';
import Layout from './components/Layout';

function App() {
  const { state } = useCountriesContext();

  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
