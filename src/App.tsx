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
        <p className='justify-self-center dark:text-white-text-elements'>Loading...</p>
      ) : state.errorMessage ? (
        <p>{state.errorMessage}</p>
      ) : (
        <div className={`justify-self-center
                          lg:grid lg:grid-cols-3 lg:gap-x-20 lg:w-full
                          2xl:grid-cols-3
                          2xl:gap-x-[10.5rem]
                        `}>
          {state.countries.map((country) => (
            <Link
              to={`/${country.name.common.replace(/\s+/g, '-').toLowerCase()}`}
              state={{ country }}
              key={
                country.tld
                  ? country.tld[0] + country.name.official
                  : country.name.official
              }
            >
              <Card country={country} />
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default App;
