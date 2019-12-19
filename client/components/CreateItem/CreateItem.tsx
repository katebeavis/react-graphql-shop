import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useRouter } from 'next/router';

import { Form } from './CreateItem.style';
import { CREATE_ITEM_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';
import { ITEM_ROUTE } from '../../constants/routes';
import { CLOUDINARY_URL } from '../../config';

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
  const [file, setFile] = useState<any>(null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);

  const [mutate, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted: data => {
      const { id } = data.createItem;
      router.push({ pathname: ITEM_ROUTE, query: { id } });
    }
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    files && setFile(files[0]);

    if (files) {
      const reader = new FileReader();
      const img: HTMLImageElement = document.querySelector('img')!;

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event && event.target) {
          const elem = event.target.result;
          img.src = elem as string;
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const uploadFile = async () => {
    setFileUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'react-graphql-shop');
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'post',
        body: data
      });
      const file = await response.json();
      setFileUploading(false);
      return file;
    } catch (error) {
      // TODO how to deal with error
      console.log('there was an error!');
    }
  };

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { title, description, price } = item;
    try {
      const response = await uploadFile();
      mutate({
        variables: {
          title,
          description,
          price,
          image: response.secure_url,
          largeImage: response.eager[0].secure_url
        }
      });
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Error error={error} />
      <h2>Sell an item</h2>
      <fieldset
        disabled={loading || fileUploading}
        aria-busy={loading || fileUploading}
      >
        <label htmlFor='file'>
          Image
          <input
            type='file'
            id='file'
            name='file'
            placeholder='Upload an image'
            onChange={handleFileChange}
            required
          />
          <img id='something' src='' alt='Upload preview' width='200' />
        </label>
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
