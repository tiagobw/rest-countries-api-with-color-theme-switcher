import { Routes, Route } from 'react-router-dom';

import CountryPage from './pages/CountryPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path=':countryName' element={<CountryPage />} />
    </Routes>
  );
};

export default App;
