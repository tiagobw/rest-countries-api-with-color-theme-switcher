import { BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className={`bg-white-text-elements flex justify-between 
                    items-center h-28 drop-shadow-md px-7 
                    md:px-20 md:h-24`}
    >
      <h1 className='font-extrabold text-xl cursor-pointer md:text-2xl'>
        <Link to='/'>Where in the world?</Link>
      </h1>
      <div className='flex items-center cursor-pointer'>
        <BsMoon className='text-xl mr-3' />
        <p className='text-lg'>Dark Mode</p>
      </div>
    </header>
  );
};

export default Header;
