import { useCountriesContext } from '../countries/hooks/useCountriesContext';
import { Country } from '../countries/model/Country';
import { AxiosCountriesFetcher } from '../countries/axios/countriesApiCalls';
import { SelectedCountryType } from '../countries/types/countriesTypes';
import { useEffect, useState } from 'react';

const Detail = () => {
  const [selectedCountry, setSelectCountry] = useState<SelectedCountryType>();
  const { state } = useCountriesContext();

  useEffect(() => {
    console.log('useEffect from Detail');

    if (state.countries.length === 0) {
      return;
    }

    const getSelectedCountry = async () => {
      const fetchedSelectedCountry = await new Country().getSelected(
        state.countries[0],
        new AxiosCountriesFetcher(),
      );

      console.log(fetchedSelectedCountry.borders);

      setSelectCountry(fetchedSelectedCountry);
    };

    getSelectedCountry();
  }, [state.countries]);

  if (!selectedCountry) {
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
    borders,
  } = selectedCountry;

  return (
    countries && (
      <article>
        <h1>{name.common}</h1>
        <p>
          <span>Native Name:</span> {name.nativeName}
        </p>
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
          <span>Currencies:</span> {currencies}
        </p>
        <p>
          <span>Languages:</span> {languages}
        </p>
        <p>
          <span>Border Countries:</span>{' '}
          {borders.map((border, index) =>
            index < borders.length - 1
              ? `${border.name.common}, `
              : border.name.common,
          )}
        </p>
      </article>
    )
  );
};

export default Detail;
