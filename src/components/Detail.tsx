import { useCountriesContext } from '../countries/hooks/useCountriesContext';

const Detail = () => {
  const { state } = useCountriesContext();

  if (state.countries.length === 0) {
    return <p>There is no Country...</p>;
  }

  const { countries } = state;

  const {
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = countries && countries[0];

  const getCurrencies = () => {
    const currenciesArray = [];

    for (const currency in currencies) {
      currenciesArray.push(currencies[currency].name);
    }

    currenciesArray.map((currency, index) =>
      index < currenciesArray.length - 1 ? `${currency}, ` : currency,
    );

    return currenciesArray;
  };

  const getLanguages = () => {
    const languagesArray = [];

    for (const language in languages) {
      languagesArray.push(languages[language]);
    }

    languagesArray.map((language, index) =>
      index < languagesArray.length - 1 ? `${language}, ` : language,
    );

    return languagesArray;
  };

  // console.log(Object.values(currencies)[0].name);

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
          <span>Sub Region:</span> {subregion}
        </p>
        <p>
          <span>Capital:</span> {capital[0]}
        </p>
        <p>
          <span>Top Level Domain:</span> {tld[0]}
        </p>
        <p>
          <span>Currencies:</span> {getCurrencies()}
        </p>
        <p>
          <span>Languages:</span> {getLanguages()}
        </p>
      </article>
    )
  );
};

export default Detail;
