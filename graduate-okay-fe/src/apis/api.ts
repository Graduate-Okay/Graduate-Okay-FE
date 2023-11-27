const address = `${process.env.REACT_APP_API_ADDRESS}`;
const api = {
  notice: `${address}/notice`,
  user: `${address}/user`,
  subject: `${address}/subject`,
  admin: `${address}/admin`,
};

export default api;
