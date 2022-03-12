import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AxiosCountriesFetcher } from '../countries/axios/AxiosCountriesFetcher';
import { useCountriesContext } from '../countries/hooks/useCountriesContext';
import { Country } from '../countries/model/Country';
import { CountriesActionTypes } from '../countries/types/countriesTypes';
import { debounce } from 'lodash';
import { DataConverter } from '../countries/utils/DataConverter';
import { useThemeContext } from '../theme/useThemeContext';

const Form = () => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const { dispatch } = useCountriesContext();
  const { darkTheme } = useThemeContext();

  const debouncedFetchAndSetCountry = useRef(
    debounce(async (countryToFetch: string) => {
      setCountry('');
      await fetchCountries(`/name/${countryToFetch}`, 8);
    }, 600),
  ).current;

  useEffect(() => {
    return () => {
      debouncedFetchAndSetCountry.cancel();
    };
  }, [debouncedFetchAndSetCountry]);

  const fetchCountries = async (url: string, numberOfCountries: number) => {
    try {
      const country = new Country(new DataConverter());
      dispatch({
        type: CountriesActionTypes.Loading,
      });
      await country.fetch(new AxiosCountriesFetcher(), url);
      dispatch({
        type: CountriesActionTypes.Fetch,
        payload: {
          countries: country.getList(numberOfCountries),
        },
      });
    } catch (error) {
      dispatch({
        type: CountriesActionTypes.Error,
        payload: {
          errorMessage: "Couldn't fetch Countries...",
        },
      });
      console.error(error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
    debouncedFetchAndSetCountry(e.target.value);
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const countryToFetch = e.target.value;
    setRegion(countryToFetch);
    await fetchCountries(`/region/${countryToFetch}`, 8);
  };

  return (
    <form className='flex flex-col justify-between pt-10 pb-5 lg:flex-row lg:mt-3 lg:pb-3'>
      <div className='flex w-full relative mb-10 lg:mb-0 lg:w-1/3 lg:h-full bg-white-text-elements dark:bg-dark-blue drop-shadow-md'>
        <AiOutlineSearch className='text-xl text-dark-gray-input dark:text-white-text-elements absolute ml-8 left-0 top-1/2 -translate-y-1/2' />
        <input
          onChange={handleInputChange}
          value={country}
          className='pl-20 py-4 rounded-md min-w-[350px] w-full focus:outline-none placeholder:text-dark-gray-input dark:placeholder:text-white-text-elements dark:bg-dark-blue dark:text-white-text-elements'
          placeholder='Search for a country...'
          type='text'
        />
      </div>
      <div className='flex w-[15rem] max-w-[100%] relative lg:h-full'>
        <select
          aria-label="Regions"
          value={region}
          onChange={handleSelectChange}
          className={`pl-8 py-4 w-full rounded-md shadow-md 
                      focus:outline-none appearance-none ${
                        darkTheme ? `bg-down-arrow-white` : `bg-down-arrow`
                      } 
                      bg-no-repeat bg-[center_right_1.5rem] 
                      bg-[length:0.75rem_0.75rem] cursor-pointer
                      bg-white-text-elements
                      dark:bg-dark-blue
                      dark:text-white-text-elements
                      `}
          name='regions'
          id='regions'
        >
          <option value='filter-by-region' hidden>
            Filter by Region
          </option>
          <option value='africa'>Africa</option>
          <option value='americas'>America</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
