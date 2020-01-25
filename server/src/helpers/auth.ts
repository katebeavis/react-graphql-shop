export const authenticateUser = (userId: string | null) => {
  if (!userId) {
    throw new Error('You must be logged in');
  }
  return;
};
