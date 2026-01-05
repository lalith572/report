export const login = (icno, password, role) => {
  // dummy users
  if (icno === "admin" && password === "admin" ) {
    localStorage.setItem("user", JSON.stringify({ role }));
    return true;
  }

  if (icno === "user" && password === "user") {
    localStorage.setItem("user", JSON.stringify({ role }));
    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
