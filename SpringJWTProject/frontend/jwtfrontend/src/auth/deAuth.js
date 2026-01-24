export const deAuth= () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return {
    isLoggedIn: !!token,
    isAdmin: role === "ROLE_ADMIN",
  };
};
