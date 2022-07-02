import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifcationApi from "api/notificationApi";

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async () => {
    const res = await notifcationApi.getNotifications();
    return res.result;
  }
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async ({ id, socketId }) => {
    if (!!socketId) return socketId;
    await notifcationApi.deleteNotifications(id);
    return id;
  }
);

const notificationsSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
    notifications: [],
    error: "",
    totalUnreadNotifications: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      // state = {
      //   ...state,
      //   notifications: [...state.notifications, action.payload],
      // };
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state) => {
      state.isLoading = true;
    },
    [getNotifications.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.notifications = action.payload.notifications;
      state.totalUnreadNotifications = action.payload.totalUnreadNotifications;
    },

    [deleteNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteNotification.fulfilled]: (state, action) => {
      const cloneState = { ...state };
      console.log("payload", action.payload);
      state.isLoading = false;
      state.error = "";
      state.notifications = cloneState.notifications.filter(
        (item) => String(item?.id) !== String(action.payload)
      );
    },
  },
});
export const { addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
