import Link from 'next/link';

import { Title, Item, PriceTag, ButtonList } from './ItemCard.style';
import { ITEM_ROUTE } from '../../constants/routes';
import formatCurrency from '../../lib/formatCurrency';

interface ItemCard {
  item: Item;
}

interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ItemCard = ({ item }: ItemCard) => {
  const { id, title, price, description, image } = item;
  return (
    <Item>
      {image && <img src={image} alt={title} />}
      <Title>
        <Link href={{ pathname: ITEM_ROUTE, query: { id } }}>
          <a>{title}</a>
        </Link>
      </Title>
      <PriceTag>{formatCurrency(price)}</PriceTag>
      <p>{description}</p>
      <ButtonList>
        <Link href={{ pathname: 'update', query: { id } }}>
          <a>Edit ✏️</a>
        </Link>
        <button>Add to cart</button>
        <button>Delete</button>
      </ButtonList>
    </Item>
  );
};

export default ItemCard;
