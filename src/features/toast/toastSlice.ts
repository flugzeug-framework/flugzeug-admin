import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface ToastState {
  isActive: boolean;
  message: string;
  type: "success" | "warning" | "info" | "error";
}

const toastInitialState: ToastState = {
  message: "",
  isActive: false,
  type: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: toastInitialState,
  reducers: {
    setToast: (state, { payload }: PayloadAction<ToastState>) => {
      const { message, isActive, type } = payload;

      state.isActive = isActive;

      if (isActive) {
        state.message = message;
        state.type = type;
      }
    },
    clearToast: (state) => {
      state.isActive = false;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export const selectToast = (state: RootState): ToastState => state.toast;

export const toastReducer = toastSlice.reducer;
