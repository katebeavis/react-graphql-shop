import { useQuery } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../../queries/queries';

import ItemCard from '../ItemCard/ItemCard';
import { Container, ItemsList } from './Items.style';

const Items = () => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, { ssr: false });
  if (loading) {
    return <>Loading....</>;
  }
  if (error) {
    return <>Error: {error.message}</>;
  }
  return (
    <Container>
      <ItemsList>
        {data.items.map((item: any, index: number) => (
          <ItemCard key={index} item={item} />
        ))}
      </ItemsList>
    </Container>
  );
};

export default Items;