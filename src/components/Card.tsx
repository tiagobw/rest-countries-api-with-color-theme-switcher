import { useCountriesContext } from '../countries/hooks/useCountriesContext';

const Card = () => {
  const { state } = useCountriesContext();

  if (state.countries.length === 0) {
    return <p>There is no Country...</p>;
  }

  const { countries } = state;

  const { name, population, region, capital } = countries && countries[0];

  return (
    countries && (
      <article>
        <h1>{name.common}</h1>
        <p>
          <span>Population:</span> {population.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {region}
        </p>
        <p>
          <span>Capital:</span> {capital[0]}
        </p>
      </article>
    )
  );
};

export default Card;
