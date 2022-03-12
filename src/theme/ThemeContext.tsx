import { createContext, useEffect, useState } from 'react';

type ThemeContextType = {
  darkTheme: boolean;
  toggleDarkTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(
    localStorage.getItem('theme') === 'dark',
  );

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }

    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-very-dark-blue-background');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark:bg-very-dark-blue-background');
    }
  }, []);

  const toggleDarkTheme = () => {
    const darkThemeFromLocalStorage = localStorage.getItem('theme');

    if (darkThemeFromLocalStorage === 'dark') {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark:bg-very-dark-blue-background');
      localStorage.setItem('theme', 'light');
      setDarkTheme(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-very-dark-blue-background');
      localStorage.setItem('theme', 'dark');
      setDarkTheme(true);
    }
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
