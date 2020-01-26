import { useMutation } from 'react-apollo';

import { RemoveButton } from './RemoveItemFromCart.style';
import { REMOVE_ITEM_FROM_CART_MUTATION } from '../../mutations/mutations';

interface RemoveItemFromCartProps {
  id: string;
}

const RemoveItemFromCart = ({ id }: RemoveItemFromCartProps) => {
  const [mutate, { loading }] = useMutation(REMOVE_ITEM_FROM_CART_MUTATION);
  return (
    <RemoveButton
      onClick={() => mutate({ variables: { id } })}
      disabled={loading}
      title={'Delete item'}
    >
      &times;
    </RemoveButton>
  );
};

export default RemoveItemFromCart;
