import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AxiosCountriesFetcher } from '../countries/axios/countriesApiCalls';
import { useCountriesContext } from '../countries/context/useCountriesContext';
import { Country } from '../countries/model/Country';
import { CountriesActionTypes } from '../countries/types/countriesTypes';
import { debounce } from 'lodash';

const Form = () => {
  const [region, setRegion] = useState('');
  const { state, dispatch } = useCountriesContext();

  const debouncedFetchAndSetCountry = useRef(
    debounce(async (countryToFetch: string) => {
      console.log('countryToFetch:', countryToFetch);
      await fetchCountries(`/name/${countryToFetch}`, 8);
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedFetchAndSetCountry.cancel();
    };
  }, [debouncedFetchAndSetCountry]);

  const fetchCountries = async (url: string, numberOfCountries: number) => {
    try {
      const country = new Country();
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
      console.log(state.countries);
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
    <form className='flex flex-col justify-between py-10'>
      <div className='flex w-full relative mb-10'>
        <AiOutlineSearch className='text-xl text-dark-gray-input absolute ml-8 left-0 top-1/2 -translate-y-1/2' />
        <input
          onChange={handleInputChange}
          className='pl-20 py-4 rounded-md w-full shadow-md focus:outline-none placeholder:text-dark-gray-input'
          placeholder='Search for a country...'
          type='text'
        />
      </div>
      <div className='flex w-[60%] relative'>
        <select
          value={region}
          onChange={handleSelectChange}
          className='pl-8 py-4 w-full rounded-md shadow-md focus:outline-none appearance-none bg-down-arrow bg-no-repeat bg-[center_right_1.5rem] bg- bg-[length:0.75rem_0.75rem] cursor-pointer'
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