import useUser from '../../customHooks/useUser';
import SignIn from '../SignIn/SignIn';
import Error from '../Error/Error';

const AuthenticationWrapper = ({ children }: any) => {
  const { loading, error, data } = useUser();
  if (loading) return null;
  if (error) return <Error error={error} />;

  const isAuthenticated = data.userDetails;

  if (!isAuthenticated) {
    return <SignIn />;
  }
  return children;
};

export default AuthenticationWrapper;
