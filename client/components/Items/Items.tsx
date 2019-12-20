import { useQuery } from 'react-apollo';
import { useRouter } from 'next/router';

import { ALL_ITEMS_QUERY } from '../../queries/queries';
import ItemCard from '../ItemCard/ItemCard';
import { Container, ItemsList } from './Items.style';
import Pagination from '../Pagination/Pagination';
import Error from '../Error/Error';
import { PER_PAGE } from '../../config';

const Items = () => {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt(page[0]) || 1;
  const skip = currentPage * PER_PAGE - currentPage;

  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, {
    ssr: false,
    variables: { skip }
  });

  if (loading) {
    return <>Loading....</>;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container>
      <Pagination currentPage={currentPage} />
      <ItemsList>
        {data.items.map((item: any, index: number) => (
          <ItemCard key={index} item={item} />
        ))}
      </ItemsList>
      <Pagination currentPage={currentPage} />
    </Container>
  );
};

export default Items;
