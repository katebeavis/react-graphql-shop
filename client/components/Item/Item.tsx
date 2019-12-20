import { useQuery } from 'react-apollo';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { SINGLE_ITEM_QUERY } from '../../queries/queries';
import Error from '../Error/Error';
import { ItemStyle, Details, Image } from './Item.style';

const Item = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No item found for that id</p>;

  const { item } = data;

  return (
    <ItemStyle>
      <Head>
        <title>React GraphQL store | {item.title}</title>
      </Head>
      <Image src={item.largeImage} alt={item.title} />
      <Details>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </Details>
    </ItemStyle>
  );
};

export default Item;
