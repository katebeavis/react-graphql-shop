import { useState } from 'react';

import { Button } from './UserPermissions.style';
import { IUser } from '../../shared/types';

interface UserProps {
  user: IUser;
  permissions: string[];
}

const UserPermissions = ({ user, permissions }: UserProps) => {
  const [permissionArray, setPermissionArray] = useState<string[]>(
    user.permissions
  );

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
              onChange={handlePermissionChange}
            />
          </label>
        </td>
      ))}
      <td>
        <Button>Update</Button>
      </td>
    </tr>
  );
};

export default UserPermissions;
