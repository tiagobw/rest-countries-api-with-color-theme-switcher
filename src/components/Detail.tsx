import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';

import { Country } from '../countries/model/Country';
import { AxiosCountriesFetcher } from '../countries/axios/countriesApiCalls';
import {
  CountriesActionTypes,
  CountryType,
  SelectedCountryType,
} from '../countries/types/countriesTypes';
import { DataConverter } from '../countries/utils/DataConverter';
import { useCountriesContext } from '../countries/hooks/useCountriesContext';

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
    return <p className='pt-20 justify-self-center'>Loading...</p>;
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
    <>
      <Link
        className='font-semibold py-3 w-1/3 max-w-[11rem] bg-white-text-elements mt-12 drop-shadow-md'
        to='/'
      >
        <nav className='flex justify-center items-center '>
          <ImArrowLeft2 className='mr-3 text-lg' />
          <p>Back</p>
        </nav>
      </Link>
      {country && (
        <article className='mt-20 w-[350px] justify-self-center'>
          <img
            className='h-[250px] w-full max-w-[400px] object-cover rounded-lg'
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
            {capital && capital[0] && (
              <p className='text-lg mb-12'>
                <span className='font-semibold'>Capital:</span> {capital[0]}
              </p>
            )}
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
                    key={
                      border.tld
                        ? border.tld[0] + border.name.official
                        : border.name.official
                    }
                    className='shadow-md text-center text-lg py-2 px-6 bg-white-text-elements'
                    to={`/${border.name.common
                      .replace(/\s+/g, '-')
                      .toLowerCase()}`}
                    state={{ country: border }}
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </>
          )}
        </article>
      )}
    </>
  );
};

export default Detail;
