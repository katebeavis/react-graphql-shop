import { default as SignupForm } from '../components/Signup/Signup';
import { default as SigninForm } from '../components/SignIn/SignIn';

import { Columms } from '../shared/shared.style';

const Signup = () => {
  return (
    <Columms>
      <SignupForm />
      <SigninForm />
    </Columms>
  );
};

export default Signup;
