import useAuth from '../../customHooks/useAuth';
import SignIn from '../SignIn/SignIn';
import Error from '../Error/Error';

const AuthenticationWrapper = ({ children }: any) => {
  const [loading, error, data] = useAuth();
  if (loading) return null;
  if (error) return <Error error={error} />;

  const isAuthenticated = data.userDetails;

  if (!isAuthenticated) {
    return <SignIn />;
  }
  return children;
};

export default AuthenticationWrapper;
