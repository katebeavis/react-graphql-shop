import { default as SignupForm } from '../components/SignUp/SignUp';
import { default as SigninForm } from '../components/SignIn/SignIn';
import { default as RequestPasswordResetForm } from '../components/RequestPasswordReset/RequestPasswordReset';

import { Columms } from '../shared/shared.style';

const SignUp = () => {
  return (
    <Columms>
      <SignupForm />
      <SigninForm />
      <RequestPasswordResetForm />
    </Columms>
  );
};

export default SignUp;
