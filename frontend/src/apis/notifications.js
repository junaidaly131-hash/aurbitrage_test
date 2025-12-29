import { api } from "./api";

const getAllNotifications = async (
  page = 1,
  limit = 10,
  read = false,
  unread = false,
  signal = null,
) => {
  const url = `/api/v1/notification/all?page=${page}&limit=${limit}&read=${read}&unread=${unread}`;
  return await api.get(url, signal);
};
const readUnreadNotification = async (id, type = "read", signal = null) => {
  let url = `/api/v1/notification/mark-`;
  if (type === "unread") {
    url += `unread`;
  } else {
    url += `read`;
  }
  return await api.post(url, { notification_id: id }, signal);
};
const deleteNotification = async (id) => {
  const url = `/api/v1/notification/delete/${id}`;
  return await api.del(url);
};

export { getAllNotifications, readUnreadNotification, deleteNotification };
