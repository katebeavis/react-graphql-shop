import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../queries/queries';

function useAuth() {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  return [{ loading, error, authUser: data }];
}

export default useAuth;
