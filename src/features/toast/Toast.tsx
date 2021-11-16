import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast, selectToast } from "./toastSlice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Toast() {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(clearToast());
  };

  return (
    <React.Fragment>
      <Snackbar
        open={toast.isActive}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
