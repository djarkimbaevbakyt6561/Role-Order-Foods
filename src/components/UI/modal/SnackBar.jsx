import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
export const SnackBar = ({ open, handleClose, severity, children }) => {
  return (
    <>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {children}
        </Alert>
      </Snackbar>
    </>
  );
};
