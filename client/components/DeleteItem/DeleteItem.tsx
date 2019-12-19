import { useMutation } from 'react-apollo';

import { ALL_ITEMS_QUERY } from '../../queries/queries';
import { DELETE_ITEM_MUTATION } from '../../mutations/mutations';

const DeleteItem = ({ children, id }: any) => {
  const update = async (cache: any, payload: any) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    const items = data.items.filter((item: any) => {
      return item.id !== payload.data.deleteItem.id;
    });
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data: { items } });
  };
  const [mutate, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
    update
  });
  console.log({ error });

  const something = () => {
    if (confirm('Are you sure you want to delete?'))
      mutate({ variables: { id } });
  };
  return (
    <button onClick={something} disabled={loading}>
      {children}
    </button>
  );
};

export default DeleteItem;
