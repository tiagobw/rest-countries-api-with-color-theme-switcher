import { CountryType } from '../countries/types/countriesTypes';

type CardProps = {
  country: CountryType;
};

const Card = ({ country }: CardProps) => {
  const { flags, name, population, region, capital } = country;

  return (
    <article>
      <img src={flags.svg} alt={`${name} flag`} />
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
  );
};

export default Card;
