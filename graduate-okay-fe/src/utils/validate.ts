/**
 * @param email
 * @param password
 */
export const isEmpty = (email: string, password?: string) => {
  if (password) {
    return email === "" || password === "";
  }
  return email === "";
};

export const emailValidate = (email: string) => {};
