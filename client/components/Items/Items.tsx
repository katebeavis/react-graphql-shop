import { useQuery } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../queries/queries';

const Items = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, { ssr: false });
  console.log({ loading: loading, error: error, data: data });
  if (loading) {
    return <>Loading....</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }
  return <>I found {data.items.length} items</>;
};

export default Items;
