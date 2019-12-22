import { useState, SyntheticEvent } from 'react';
import { useMutation } from 'react-apollo';

import { Form } from '../../shared/shared.style';
import { SIGN_IN_MUTATION } from '../../mutations/mutations';
import { CURRENT_USER_QUERY } from '../../queries/queries';
import Error from '../Error/Error';

interface User {
  email: string;
  password: string;
}

const SignIn = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  });

  const [mutate, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
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
        <h2>Sign in</h2>
        <Error error={error} />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='email'
          value={user.email}
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

export default SignIn;
