import { default as SignupForm } from '../components/Signup/Signup';
import { Columms } from '../shared/shared.style';

const Signup = () => {
  return (
    <Columms>
      <SignupForm />
      <SignupForm />
      <SignupForm />
    </Columms>
  );
};

export default Signup;
