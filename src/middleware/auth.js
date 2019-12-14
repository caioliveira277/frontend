export const isAuthenticated = () => {
  try {
    const tokenStoreage = localStorage.getItem("token");
    if (!tokenStoreage) throw new Error("No token provided");

    return true;

  } catch (error) {
    return false;
  }
};
