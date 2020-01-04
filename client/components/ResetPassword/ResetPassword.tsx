import { useState, SyntheticEvent } from 'react';
import { useMutation } from 'react-apollo';

import { Form } from '../../shared/shared.style';
import { RESET_PASSWORD_MUTATION } from '../../mutations/mutations';
import { CURRENT_USER_QUERY } from '../../queries/queries';
import Error from '../Error/Error';

interface PasswordReset {
  password: string;
  confirmPassword: string;
}

const ResetPassword = ({ resetToken }: any) => {
  const [passwordReset, setPasswordReset] = useState<PasswordReset>({
    password: '',
    confirmPassword: ''
  });

  const [mutate, { loading, error, called }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  );

  const saveToState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setPasswordReset({ ...passwordReset, [name]: value });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    mutate({ variables: { resetToken, ...passwordReset } });
  };
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-disabled={loading}>
        <h2>Set new password</h2>
        <Error error={error} />
        {!loading && !error && called && <p>Enter your new password below.</p>}
        <label htmlFor='password'>New password</label>
        <input
          type='password'
          name='password'
          placeholder='New password'
          value={passwordReset.password}
          onChange={saveToState}
        />
        <label htmlFor='confirmPassword'>Confirm password</label>
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          value={passwordReset.confirmPassword}
          onChange={saveToState}
        />
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
  );
};

export default ResetPassword;
