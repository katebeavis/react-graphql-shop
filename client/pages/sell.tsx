import CreateItem from '../components/CreateItem/CreateItem';
import AuthenticationWrapper from '../components/AuthenticationWrapper/AuthenticationWrapper';

const Sell = () => (
  <AuthenticationWrapper>
    <CreateItem />
  </AuthenticationWrapper>
);

export default Sell;
