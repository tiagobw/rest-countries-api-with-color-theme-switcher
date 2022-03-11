import { BsMoon } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-white-text-elements h-28 flex justify-between items-center drop-shadow-md px-7'>
      <h1 className='font-extrabold text-xl cursor-pointer'>
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
