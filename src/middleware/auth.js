export const isAuthenticated = () => {
  try {
    const tokenStoreage = sessionStorage.getItem("token");
    if (!tokenStoreage) throw new Error("No token provided");

    return true;

  } catch (error) {
    return false;
  }
};
