import { useMutation } from 'react-apollo';

import { ADD_ITEM_TO_CART_MUTATION } from '../../mutations/mutations';
import { CURRENT_USER_QUERY } from '../../queries/queries';

interface AddItemToCartProps {
  id: string;
}

const AddItemToCart = ({ id }: AddItemToCartProps) => {
  const [mutate, { loading }] = useMutation(ADD_ITEM_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  return (
    <button
      onClick={() => mutate({ variables: { id, quantity: 1 } })}
      disabled={loading}
    >
      Add to cart 🛒
    </button>
  );
};

export default AddItemToCart;
