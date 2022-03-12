import { CountryType } from '../countries/types/countriesTypes';

type CardProps = {
  country: CountryType;
};

const Card = ({ country }: CardProps) => {
  const { flags, name, population, region, capital } = country;

  return (
    <article className='w-[350px] py-10 rounded-lg drop-shadow-sm lg:m-0 lg:w-[350px]'>
      <img
        className='h-[220px] w-full object-cover rounded-t-lg lg:h-[225px]'
        src={flags.svg}
        alt={`${name} flag`}
      />
      <div className='p-10 bg-white-text-elements rounded-b-lg'>
        <h1 className='font-extrabold	text-3xl mb-6'>{name.common}</h1>
        <p className='text-lg mb-2'>
          <span className='font-semibold'>Population:</span>{' '}
          {population.toLocaleString()}
        </p>
        <p className='text-lg mb-2'>
          <span className='font-semibold'>Region:</span> {region}
        </p>
        {capital && capital[0] && (
          <p className='text-lg mb-6'>
            <span className='font-semibold'>Capital:</span> {capital[0]}
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
