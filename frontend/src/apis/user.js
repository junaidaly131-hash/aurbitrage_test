import { api } from "./api";

const updateUser = async (formData) => {
  const apiEndpoint = `/api/v1/user/update-user`;

  return await api.post(apiEndpoint, formData);
};

export { updateUser };
