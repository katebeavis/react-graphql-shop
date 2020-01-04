import { useRouter } from 'next/router';

import ResetPassword from '../components/ResetPassword/ResetPassword';

const Reset = () => {
  const router = useRouter();
  const { resetToken } = router.query;

  return <ResetPassword resetToken={resetToken} />;
};

export default Reset;
