import { useLocation } from 'react-router-dom';
import Detail from '../components/Detail';
import Layout from '../components/Layout';

const CountryPage = () => {
  const { state } = useLocation();

  if (!(state as any)?.country) {
    return (
      <Layout>
        <p>Sorry, something went wrong...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Detail country={(state as any).country} />
    </Layout>
  );
};

export default CountryPage;
