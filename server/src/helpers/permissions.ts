export const hasPermission = (
  permissions: string[],
  requiredPermissions: string[]
) => {
  const matchedPermissions = permissions.filter(permission =>
    requiredPermissions.includes(permission)
  );
  if (!matchedPermissions.length) {
    throw new Error("You don't have the permissions to do that");
  }
  return matchedPermissions;
};
