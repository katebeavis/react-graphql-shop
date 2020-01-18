import { Button } from './User.style';

interface UserProps {
  user: any;
  permissions: any;
}

const User = ({ user, permissions }: UserProps) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {permissions.map((permission: any, index: number) => (
        <td key={index}>
          <label htmlFor={`${user.id}-permission-${permission}`}>
            <input type='checkbox' />
          </label>
        </td>
      ))}
      <td>
        <Button>Update</Button>
      </td>
    </tr>
  );
};

export default User;
