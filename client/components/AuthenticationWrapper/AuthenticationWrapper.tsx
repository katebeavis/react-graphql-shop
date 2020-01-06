import useAuth from '../../customHooks/useAuth';
import SignIn from '../SignIn/SignIn';

const AuthenticationWrapper = ({ children }: any) => {
  const [{ loading, authUser }] = useAuth();
  if (loading) return null;
  const isAuthenticated = authUser.userDetails;

  if (!isAuthenticated) {
    return <SignIn />;
  }
  return children;
};

export default AuthenticationWrapper;
