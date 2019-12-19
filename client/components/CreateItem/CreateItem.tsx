import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useRouter } from 'next/router';

import { Form } from './CreateItem.style';
import { CREATE_ITEM_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';
import { ITEM_ROUTE } from '../../constants/routes';

interface Item {
  title: string;
  description: string;
  image: string;
  largeImage: string;
  price: number;
}

const CreateItem = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>({
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  });

  const [mutate, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: data => {
      const { id } = data.createItem;
      router.push({ pathname: ITEM_ROUTE, query: { id } });
    }
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, type, value } = event.currentTarget;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setItem({
      ...item,
      [name]: parsedValue
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { title, description, price, image, largeImage } = item;
    mutate({
      variables: {
        title,
        description,
        price,
        image,
        largeImage
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Error error={error} />
      <h2>Sell an item</h2>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            value={item.title}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={item.price}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Enter a description'
            value={item.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
  );
};

export default CreateItem;
