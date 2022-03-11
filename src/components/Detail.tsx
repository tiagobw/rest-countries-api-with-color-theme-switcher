import { Country } from '../countries/model/Country';
import { AxiosCountriesFetcher } from '../countries/axios/countriesApiCalls';
import {
  CountriesActionTypes,
  CountryType,
  SelectedCountryType,
} from '../countries/types/countriesTypes';
import { useEffect, useState } from 'react';
import { DataConverter } from '../countries/utils/DataConverter';
import { useCountriesContext } from '../countries/hooks/useCountriesContext';
import { Link } from 'react-router-dom';

type DetailProps = {
  country: CountryType;
};

const Detail = ({ country }: DetailProps) => {
  const [selectedCountry, setSelectCountry] = useState<SelectedCountryType>();
  const { state, dispatch } = useCountriesContext();

  useEffect(() => {
    console.log('useEffect from Detail');

    const getSelectedCountry = async () => {
      dispatch({
        type: CountriesActionTypes.Loading,
      });

      const fetchedSelectedCountry = await new Country(
        new DataConverter(),
      ).getSelected(country, new AxiosCountriesFetcher());

      dispatch({
        type: CountriesActionTypes.StopLoading,
      });

      setSelectCountry(fetchedSelectedCountry);
    };

    getSelectedCountry();
  }, [country, dispatch]);

  if (!selectedCountry || state.loading) {
    return <p>Loading...</p>;
  }

  const {
    flags,
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
    country && (
      <article className='mt-20'>
        <img
          className='h-[220px] w-full object-cover rounded-lg'
          src={flags.svg}
          alt={`${name} flag`}
        />
        <div className='py-10'>
          <h1 className='font-extrabold	text-3xl mb-6'>{name.common}</h1>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Native Name:</span>{' '}
            {name.nativeName}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Population:</span>{' '}
            {population.toLocaleString()}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Region:</span> {region}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Sub Region:</span> {subregion}
          </p>
          <p className='text-lg mb-12'>
            <span className='font-semibold'>Capital:</span> {capital[0]}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Top Level Domain:</span> {tld}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Currencies:</span> {currencies}
          </p>
          <p className='text-lg mb-2'>
            <span className='font-semibold'>Languages:</span> {languages}
          </p>
        </div>
        {borders && (
          <>
            <p className='text-2xl font-semibold mb-6'>Border Countries:</p>
            <div className='grid grid-cols-2 gap-4 auto-cols-auto auto-rows-auto mb-20'>
              {borders.map((border) => (
                <Link
                  key={border.tld[0]}
                  className='shadow-md text-center text-lg py-2 px-6 bg-white-text-elements'
                  to={`/${border.name.common.toLowerCase()}`}
                  state={{ country: border }}
                >
                  {border.name.common}
                </Link>
              ))}
            </div>
          </>
        )}
      </article>
    )
  );
};

export default Detail;
