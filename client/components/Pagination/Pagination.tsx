import { useQuery } from 'react-apollo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { Container } from './Pagination.style';
import { PAGINATION_QUERY } from '../../queries/queries';
import Error from '../Error/Error';
import { PER_PAGE } from '../../config';

const Pagination = () => {
  const router = useRouter();
  const { page } = router.query;
  const { loading, error, data } = useQuery(PAGINATION_QUERY);

  if (loading) {
    return <>Loading....</>;
  }

  if (error) {
    return <Error error={error} />;
  }

  const { count } = data.itemsConnection.aggregate;
  const pages = Math.ceil(count / PER_PAGE);
  const currentPage = parseInt(page[0]) || 1;
  return (
    <Container>
      <Head>
        <title>
          React GraphQL store | Page {currentPage} of {pages}
        </title>
      </Head>
      <Link href={{ pathname: 'items', query: { page: currentPage - 1 } }}>
        <a aria-disabled={currentPage <= 1}>← Prev</a>
      </Link>
      <p>
        Page {currentPage} of {pages}
      </p>
      <p>{count} items total</p>
      <Link href={{ pathname: 'items', query: { page: currentPage + 1 } }}>
        <a aria-disabled={currentPage >= pages}>Next →</a>
      </Link>
    </Container>
  );
};

export default Pagination;
