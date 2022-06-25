import axiosClient from "./axiosClient";

const notifcationApi = {
  getNotifications: () => {
    const url = "/notifications";
    return axiosClient.get(url);
  },
  deleteNotifications: (id) => {
    const url = "/notifications";
    return axiosClient.delete(`${url}/${id}`);
  },
};

export default notifcationApi;
