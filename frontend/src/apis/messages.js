import { api } from "./api";

const getUsers = async (query = "") => {
  const url = `/api/v1/message/users${query}`;
  return await api.get(url);
};

export { getUsers };
