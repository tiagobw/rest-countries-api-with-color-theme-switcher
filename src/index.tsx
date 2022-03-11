import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { CountriesProvider } from './countries/context/CountriesContext';
import CountryPage from './pages/CountryPage';

ReactDOM.render(
  <React.StrictMode>
    <CountriesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path=':countryName' element={<CountryPage />} />
        </Routes>
      </BrowserRouter>
    </CountriesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
