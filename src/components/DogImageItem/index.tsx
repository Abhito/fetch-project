import { DogImageItemProps } from './DogImageItem.interface.ts';
import {
  createTheme,
  ImageListItem,
  ImageListItemBar,
  ThemeProvider,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useMemo } from 'react';

export default function DogImageItem(props: DogImageItemProps) {
  const { dog, onFavorite, favorites, hideIcon = false } = props;

  const isFavorite = useMemo(() => {
    return favorites.includes(dog.id);
  }, [favorites]);

  const theme = createTheme(
    {
      components: {
        MuiImageListItemBar: {
          styleOverrides: {
            titleWrap: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            title: {
              fontSize: hideIcon ? '1.2rem' : '1rem',
            },
            subtitle: {
              fontSize: '1rem',
              lineHeight: '24px',
            },
          },
        },
      },
    },
    [hideIcon],
  );

  return (
    <ThemeProvider theme={theme}>
      <ImageListItem>
        <img src={dog.img} alt={dog.name} loading={'lazy'} />
        <ImageListItemBar
          position={'top'}
          title={dog.name}
          subtitle={`${dog.age === 0 ? '< 1 year old' : `${dog.age} ${dog.age > 1 ? 'years old' : 'year old'}`}`}
          actionIcon={
            !hideIcon ? (
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${dog.name}`}
                onClick={() => onFavorite(dog.id, !isFavorite)}
              >
                {isFavorite ? (
                  <StarIcon fontSize={'large'} />
                ) : (
                  <StarBorderIcon fontSize={'large'} />
                )}
              </IconButton>
            ) : undefined
          }
          actionPosition='left'
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
        <ImageListItemBar
          position={'bottom'}
          title={dog.breed}
          subtitle={`ZIP ${dog.zip_code}`}
          sx={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
              'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
      </ImageListItem>
    </ThemeProvider>
  );
}
