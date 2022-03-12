import { CountryType } from '../countries/types/countriesTypes';

type CardProps = {
  country: CountryType;
};

const Card = ({ country }: CardProps) => {
  const { flags, name, population, region, capital } = country;

  return (
    <article className='w-[350px] py-10 rounded-lg drop-shadow-sm lg:m-0 lg:w-[360px]'>
      <img
        className='h-[220px] w-full object-cover rounded-t-lg lg:h-[235px] dark:bg-dark-blue'
        src={flags.svg}
        alt={`${name} flag`}
      />
      <div className='p-10 bg-white-text-elements dark:bg-dark-blue rounded-b-lg'>
        <h1 className='dark:text-white-text-elements font-extrabold	text-3xl mb-6 lg:text-2xl'>
          {name.common}
        </h1>
        <p className='dark:text-white-text-elements text-lg mb-2 lg:text-base'>
          <span className='font-semibold'>Population:</span>{' '}
          <span className='dark:text-light-gray-text'>
            {population.toLocaleString()}
          </span>
        </p>
        <p className='dark:text-white-text-elements text-lg mb-2 lg:text-base'>
          <span className='font-semibold'>Region:</span>{' '}
          <span className='dark:text-light-gray-text'>{region}</span>
        </p>
        {capital && capital[0] && (
          <p className='dark:text-white-text-elements text-lg mb-6 lg:text-base lg:mb-3'>
            <span className='font-semibold'>Capital:</span>{' '}
            <span className='dark:text-light-gray-text'>{capital[0]}</span>
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
