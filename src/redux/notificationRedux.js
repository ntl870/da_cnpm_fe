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
  async ({ id, deletedNoti }) => {
    await notifcationApi.deleteNotifications(id);
    return deletedNoti;
  }
);

const notificationsSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
    notifications: [],
    error: "",
  },
  reducers: {},
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
    },

    [deleteNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteNotification.fulfilled]: (state, action) => {
      const cloneState = { ...state };
      state.isLoading = false;
      state.error = "";
      state.notifications = cloneState.notifications.filter(
        (item) => String(item?.id) !== action.payload
      );
    },
  },
});

export default notificationsSlice.reducer;
