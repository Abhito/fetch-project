import { Box, Paper, TextField, Typography, Button } from '@mui/material';
import styles from './styles.module.scss';
import { useCallback, useState } from 'react';
import { useAuth } from '../../AuthContext.tsx';
import { ApiService } from '../../api/ApiService.ts';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginUser = useCallback(async () => {
    try {
      await ApiService.loginUser({ name, email });
      login({ name, email });
      navigate('/home');
    } catch (e) {
      console.log(e);
    }
  }, [name, email]);

  return (
    <Box className={styles.loginContainer}>
      <Paper className={styles.loginCard}>
        <Typography>Sign In</Typography>
        <Box className={styles.inputsContainer}>
          <TextField
            label={'Name'}
            variant='standard'
            value={name}
            onChange={e => setName(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label={'Email'}
            variant='standard'
            value={email}
            onChange={e => setEmail(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>
        <Box>
          <Button
            variant='contained'
            className={styles.loginButton}
            onClick={loginUser}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
