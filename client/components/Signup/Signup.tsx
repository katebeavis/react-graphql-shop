import { useState, SyntheticEvent } from 'react';
import { useMutation } from 'react-apollo';

import { Form } from '../../shared/shared.style';
import { CREATE_USER_MUTATION } from '../../mutations/mutations';
import { CURRENT_USER_QUERY } from '../../queries/queries';
import Error from '../Error/Error';

interface User {
  email: string;
  name: string;
  password: string;
}

const SignUp = () => {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    password: ''
  });

  const [mutate, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    refetchQueries: [
      {
        query: CURRENT_USER_QUERY
      }
    ]
  });

  const saveToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    mutate({ variables: user });
  };
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-disabled={loading}>
        <h2>Sign up for an account</h2>
        <Error error={error} />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='email'
          value={user.email}
          onChange={saveToState}
        />
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          placeholder='name'
          value={user.name}
          onChange={saveToState}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='password'
          value={user.password}
          onChange={saveToState}
        />
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
  );
};

export default Signup;
