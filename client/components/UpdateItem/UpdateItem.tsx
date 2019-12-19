import { useState, SyntheticEvent } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useRouter } from 'next/router';

import { Form } from '../CreateItem/CreateItem.style';
import { SINGLE_ITEM_QUERY } from '../../queries/queries';
import { UPDATE_ITEM_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';
import { ITEM_ROUTE } from '../../constants/routes';

interface Item {
  title: string;
  description: string;
  price: number;
}

const UpdateItem = () => {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState<Item>({
    title: '',
    description: '',
    price: 0
  });

  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    ssr: false,
    variables: { id },
    onCompleted: data => {
      setItem({
        ...data.item
      });
    }
  });

  const [
    mutate,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted: data => {
      const { id } = data.updateItem;
      router.push({ pathname: ITEM_ROUTE, query: { id } });
    }
  });

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (!data.item) {
    return <h1>No item found for that id</h1>;
  }

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

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      mutate({
        variables: {
          id,
          ...item
        }
      });
    } catch (error) {
      // TODO how to deal with error
      console.log('there was an error!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Error error={mutationError || error} />
      <h2>Update item</h2>
      <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            defaultValue={data.item.title}
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
            defaultValue={data.item.price}
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
            defaultValue={data.item.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit'>Update</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
