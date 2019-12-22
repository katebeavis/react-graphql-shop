import { useMutation } from 'react-apollo';

import { SIGN_OUT_MUTATION } from '../../mutations/mutations';
import { CURRENT_USER_QUERY } from '../../queries/queries';
import Error from '../Error/Error';

const SignOut = () => {
  const [mutate, { loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  return <button onClick={() => mutate()}>Sign out</button>;
};

export default SignOut;
