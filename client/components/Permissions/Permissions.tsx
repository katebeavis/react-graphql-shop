import { useQuery } from 'react-apollo';

import { ALL_USERS_QUERY } from '../../queries/queries';
import Error from '../Error/Error';
import { Table } from './Permissions.style';
import { PERMISSIONS } from '../../constants/constants';
import UserPermissions from '../UserPermissions/UserPermissions';
import { IUser } from '../../shared/types';

const Permissions = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) return <p>Loading....</p>;
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <h1>Manage users</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {PERMISSIONS.map((permission: string, index: number) => {
              return <th key={index}>{permission}</th>;
            })}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.users.map((user: IUser, index: number) => (
            <UserPermissions
              key={index}
              user={user}
              permissions={PERMISSIONS}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Permissions;
