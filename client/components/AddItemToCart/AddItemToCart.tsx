import { useMutation } from 'react-apollo';

import { ADD_ITEM_TO_CART_MUTATION } from '../../mutations/mutations';

interface AddItemToCartProps {
  id: string;
}

const AddItemToCart = ({ id }: AddItemToCartProps) => {
  const [mutate] = useMutation(ADD_ITEM_TO_CART_MUTATION);
  return (
    <button onClick={() => mutate({ variables: { id, quantity: 1 } })}>
      Add to cart 🛒
    </button>
  );
};

export default AddItemToCart;
