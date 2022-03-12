import { BsMoon, BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../theme/useThemeContext';

const Header = () => {
  const { darkTheme, toggleDarkTheme } = useThemeContext();

  return (
    <header
      className={`bg-white-text-elements dark:bg-dark-blue
                    dark:text-white-text-elements
                    flex justify-between 
                    items-center h-28 shadow-md px-7 
                    relative
                    lg:px-24 lg:h-24
                    2xl:px-60
                    `}
    >
      <h1 className='font-extrabold text-xl cursor-pointer lg:text-2xl'>
        <Link to='/'>Where in the world?</Link>
      </h1>
      <div
        onClick={toggleDarkTheme}
        className='flex items-center cursor-pointer'
      >
        {darkTheme ? (
          <BsSun className='text-2xl mr-3' />
        ) : (
          <BsMoon className='text-xl mr-3' />
        )}
        <p className='text-lg'>{darkTheme ? 'Light Mode' : 'Dark Mode'}</p>
      </div>
    </header>
  );
};

export default Header;
