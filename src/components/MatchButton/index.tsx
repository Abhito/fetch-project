import {
  Button,
  createTheme,
  ThemeProvider,
  Box,
  Modal,
  Paper,
  Typography,
  Zoom,
} from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';
import { MatchButtonProps } from './MatchButton.interface.ts';
import { useCallback, useState } from 'react';
import { ApiService } from '../../api/ApiService.ts';
import styles from './styles.module.scss';
import { Dog } from '../DogImageItem/DogImageItem.interface.ts';
import DogImageItem from '../DogImageItem';
import { useWidth } from '../../pages/Home';

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: deepOrange['A400'],
          color: grey['50'],
          borderRadius: 20,
          border: '1px solid',
          textTransform: 'none',
          height: '40px',
          minWidth: '150px',
          ':disabled': {
            color: deepOrange['A400'],
            backgroundColor: 'white',
            borderColor: deepOrange['A400'],
          },
        },
      },
    },
  },
});
export default function MatchButton(props: MatchButtonProps) {
  const { favorites, setFavorites } = props;
  const width = useWidth();
  const [openModal, setOpenModal] = useState(false);
  const [matchDog, setMatchDog] = useState<Dog | null>(null);

  const getMatch = useCallback(async () => {
    try {
      const match = await ApiService.getMatch(favorites);
      const dog = await ApiService.getDogs([match.data.match]);
      if (dog.data.length > 0) {
        setMatchDog(dog.data[0]);
        setOpenModal(true);
      }
    } catch (err) {}
  }, [favorites]);

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <ThemeProvider theme={buttonTheme}>
        <Box className={styles.buttonContainer}>
          <Button disabled={favorites.length < 1} onClick={getMatch}>
            Find Match
          </Button>
          <Button
            disabled={favorites.length < 1}
            onClick={() => setFavorites([])}
          >
            Clear Favorites
          </Button>
        </Box>
      </ThemeProvider>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='dog-match'
        aria-describedby='dog-match'
      >
        <Box
          className={styles.modalContainer}
          sx={{ width: width === 'sm' || width === 'xs' ? '90%' : '50%' }}
        >
          {matchDog ? (
            <Zoom in={openModal}>
              <Paper className={styles.imagePaper}>
                <Typography className={styles.foundText} variant={'h6'}>
                  Found a match!!!
                </Typography>
                <DogImageItem
                  dog={matchDog}
                  onFavorite={() => {}}
                  favorites={[]}
                  hideIcon={true}
                />
              </Paper>
            </Zoom>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </>
  );
}
