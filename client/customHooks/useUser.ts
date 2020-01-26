import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../queries/queries';

const useUser = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    ssr: false
  });
  return { loading, error, data };
};

export default useUser;
