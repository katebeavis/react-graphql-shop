import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../queries/queries';

const useAuth = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  return [loading, error, data];
};

export default useAuth;
