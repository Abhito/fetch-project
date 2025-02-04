import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import styles from './styles.module.scss';
import { useCallback, useState } from 'react';
import { useAuth } from '../../AuthContext.tsx';
import { ApiService } from '../../api/ApiService.ts';
import { useNavigate } from 'react-router-dom';
import { grey, teal } from '@mui/material/colors';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme({
  palette: {
    success: {
      main: teal['600'],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: teal['600'],
          color: grey['50'],
          borderRadius: 20,
          textTransform: 'none',
          height: '40px',
          minWidth: '120px',
          ':disabled': {
            backgroundColor: teal['200'],
          },
        },
      },
    },
  },
});

const validateEmail = (email: string) => {
  console.log('hello');
  const re = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  console.log(re);
  return re;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const loginUser = useCallback(async () => {
    let notValid = false;
    if (name === '') {
      setNameValid(false);
      notValid = true;
    } else setNameValid(true);
    if (!validateEmail(email)) {
      console.log('nice');
      setEmailValid(false);
      notValid = true;
    } else setEmailValid(true);
    console.log('hello');
    if (notValid) return;
    try {
      await ApiService.loginUser({ name, email });
      login({ name, email });
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  }, [name, email]);

  // @ts-ignore
  return (
    <Box className={styles.loginContainer}>
      <ThemeProvider theme={theme}>
        <Paper className={styles.loginCard}>
          <Box className={styles.signContainer}>
            <PetsIcon sx={{ fontSize: '50px', color: teal['600'] }} />
            <Typography variant={'h5'}>Sign In</Typography>
          </Box>
          <Box className={styles.inputsContainer}>
            <TextField
              label={'Name'}
              variant='standard'
              error={!nameValid}
              helperText={!nameValid ? 'Name cannot be empty' : ''}
              value={name}
              color='success'
              onChange={e => setName(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              error={!emailValid}
              helperText={!emailValid ? 'Email not valid' : ''}
              label={'Email'}
              variant='standard'
              value={email}
              onChange={e => setEmail(e.target.value)}
              color='success'
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box>
            <Button onClick={loginUser}>Login</Button>
          </Box>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
