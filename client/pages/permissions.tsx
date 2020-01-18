import AuthenticationWrapper from '../components/AuthenticationWrapper/AuthenticationWrapper';
import Permissions from '../components/Permissions/Permissions';

const PermissionsPage = () => {
  return (
    <AuthenticationWrapper>
      <Permissions />
    </AuthenticationWrapper>
  );
};

export default PermissionsPage;
