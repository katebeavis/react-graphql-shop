import { default as SignupForm } from '../components/SignUp/SignUp';
import { default as SigninForm } from '../components/SignIn/SignIn';

import { Columms } from '../shared/shared.style';

const SignUp = () => {
  return (
    <Columms>
      <SignupForm />
      <SigninForm />
    </Columms>
  );
};

export default SignUp;
