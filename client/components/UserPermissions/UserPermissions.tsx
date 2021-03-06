import { useState } from 'react';
import { useMutation } from 'react-apollo';

import { Button } from '../../shared/shared.style';
import { IUser } from '../../shared/types';
import { UPDATE_PERMISSIONS_MUTATION } from '../../mutations/mutations';
import Error from '../Error/Error';

interface UserProps {
  user: IUser;
  permissions: string[];
}

const UserPermissions = ({ user, permissions }: UserProps) => {
  const [permissionArray, setPermissionArray] = useState<string[]>(
    user.permissions
  );

  const [mutate, { loading, error }] = useMutation(UPDATE_PERMISSIONS_MUTATION);

  if (error) {
    return <Error error={error} />;
  }

  const handlePermissionChange = (e: any) => {
    const { checked, value } = e.target;
    let updatedPermissions = [...permissionArray];
    checked
      ? updatedPermissions.push(value)
      : (updatedPermissions = updatedPermissions.filter(
          permission => permission != value
        ));
    setPermissionArray(updatedPermissions);
  };

  const handleClick = () => {
    mutate({
      variables: {
        permissions: permissionArray,
        userId: user.id
      }
    });
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {permissions.map((permission: any, index: number) => (
        <td key={index}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input
              type='checkbox'
              checked={permissionArray.includes(permission)}
              value={permission}
              id={`${user.id}-permission-${permission}`}
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <Button disabled={loading} onClick={handleClick}>
          Updat{loading ? 'ing' : 'e'}
        </Button>
      </td>
    </tr>
  );
};

export default UserPermissions;
