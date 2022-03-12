import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from './App';
import { CountriesProvider } from './countries/context/CountriesContext';
import CountryPage from './pages/CountryPage';
import { ThemeProvider } from './theme/ThemeContext';

ReactDOM.render(
  <React.StrictMode>
    <CountriesProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path=':countryName' element={<CountryPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CountriesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
