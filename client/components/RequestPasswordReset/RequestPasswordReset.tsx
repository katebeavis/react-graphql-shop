import { useState, SyntheticEvent } from 'react';
import { useMutation } from 'react-apollo';

import { Form } from '../../shared/shared.style';
import { REQUEST_RESET_PASSWORD_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';

const RequestResetPassword = () => {
  const [email, setEmail] = useState<string>('');

  const [mutate, { loading, error, called }] = useMutation(
    REQUEST_RESET_PASSWORD_MUTATION
  );

  const saveToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    mutate({ variables: { email } });
  };
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-disabled={loading}>
        <h2>Reset a password reset</h2>
        <Error error={error} />
        {!loading && !error && called && (
          <p>Password request sent. Check your email for a reset link.</p>
        )}
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='email'
          value={email}
          onChange={saveToState}
        />
        <button type='submit'>Request reset</button>
      </fieldset>
    </Form>
  );
};

export default RequestResetPassword;
