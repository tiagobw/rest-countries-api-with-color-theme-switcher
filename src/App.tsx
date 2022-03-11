import { useCountriesContext } from './countries/hooks/useCountriesContext';
import Form from './components/Form';
import Card from './components/Card';
import Layout from './components/Layout';
import { Link } from 'react-router-dom';

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
          <Link
            to={`/${country.name.common.toLowerCase()}`}
            state={{ country }}
            key={country.tld[0]}
          >
            <Card country={country} />
          </Link>
        ))
      )}
    </Layout>
  );
}

export default App;
