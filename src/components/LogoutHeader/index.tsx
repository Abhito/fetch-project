import {
  Button,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
  Box,
} from '@mui/material';
import { useAuth } from '../../AuthContext.tsx';
import { deepOrange, grey, teal } from '@mui/material/colors';
import { Logout } from '@mui/icons-material';
import { useCallback } from 'react';
import { ApiService } from '../../api/ApiService.ts';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: deepOrange['A400'],
          color: grey['50'],
          borderRadius: 24,
          border: '1px solid',
          lineHeight: 1.2,
          textTransform: 'none',
          height: '40px',
          minWidth: '150px',
          alignItems: 'center',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
        },
      },
    },
  },
});

export default function LogoutHeader() {
  const { user, logout } = useAuth();
  const logOutUser = useCallback(async () => {
    await ApiService.logoutUser();
    logout();
  }, [logout]);

  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '12px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <PetsIcon sx={{ fontSize: '24px', color: teal['600'] }} />
            <Typography variant={'h6'}>{`Welcome ${user?.name},`}</Typography>
          </Box>
          <Typography>
            Select your favorites to find your perfect match!
          </Typography>
        </Box>
        <Button
          endIcon={<Logout sx={{ width: 18, height: 18 }} />}
          onClick={logOutUser}
        >
          Log Out
        </Button>
      </Paper>
    </ThemeProvider>
  );
}
