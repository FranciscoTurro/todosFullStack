export const useLogout = () => {
  localStorage.removeItem('currentUser');
  console.log('logged out');
};
