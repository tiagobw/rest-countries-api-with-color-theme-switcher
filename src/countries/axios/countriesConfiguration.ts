import countriesAxios from 'axios';

countriesAxios.defaults.baseURL = 'https://restcountries.com/v3.1';

export { countriesAxios };
