import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export { useThemeContext };
