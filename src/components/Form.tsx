import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AxiosCountriesFetcher } from '../countries/axios/countriesApiCalls';
import { useCountriesContext } from '../countries/context/useCountriesContext';
import { Country } from '../countries/model/Country';
import { CountriesActionTypes } from '../countries/types/countriesTypes';

const Form = () => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const { state, dispatch } = useCountriesContext();

  useEffect(() => {
    console.log('useEffect from Form');

    if (region.length > 0) {
      const fetchCountriesByRegion = async () => {
        try {
          const country = new Country();
          dispatch({
            type: CountriesActionTypes.Loading,
          });
          await country.fetch(new AxiosCountriesFetcher(), `/region/${region}`);
          dispatch({
            type: CountriesActionTypes.Fetch,
            payload: {
              countries: country.getList(8),
              loading: false,
            },
          });
          console.log(state.countries);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCountriesByRegion();
    }
  }, [region, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <form className='flex flex-col justify-between py-10'>
      <div className='flex w-full relative mb-10'>
        <AiOutlineSearch className='text-xl text-dark-gray-input absolute ml-8 left-0 top-1/2 -translate-y-1/2' />
        <input
          className='pl-20 py-4 rounded-md w-full shadow-md focus:outline-none placeholder:text-dark-gray-input'
          placeholder='Search for a country...'
          type='text'
        />
      </div>
      <div className='flex w-[60%] relative'>
        <select
          value={region}
          onChange={handleChange}
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
