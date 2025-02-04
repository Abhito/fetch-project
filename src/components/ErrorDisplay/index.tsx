import { useError } from './ErrorContext.tsx';
import { Alert, Snackbar } from '@mui/material';

export function ErrorDisplay() {
  const { error, clearError, open } = useError();

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={clearError}>
      <Alert onClose={clearError} severity={'error'} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
}
