import {
  Box,
  Breakpoint,
  Paper,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Dog } from '../../components/DogImageItem/DogImageItem.interface.ts';
import { ApiService } from '../../api/ApiService.ts';
import DogImageItem from '../../components/DogImageItem';
import styles from './styles.module.scss';
import Masonry from '@mui/lab/Masonry';
import ImageListHeader from '../../components/ImageListHeader';
import Pagination from '../../components/Pagination';
import LogoutHeader from '../../components/LogoutHeader';
import { useError } from '../../components/ErrorDisplay/ErrorContext.tsx';

type BreakpointOrNull = Breakpoint | null;

export function useWidth() {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export default function Home() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const width = useWidth();
  const { setErrorMessage } = useError();
  const columnMap = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

  const getDogs = useCallback(async () => {
    try {
      const result = await ApiService.searchDogs({
        size: 50,
        from: page === 0 ? 0 : 50 * page + 1,
        sort: `breed:${sort}`,
        breeds: selectedBreeds,
      });
      setCount(result.data.total);
      const dogResponse = await ApiService.getDogs(result.data.resultIds);
      setDogs(dogResponse.data);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  }, [page, sort, selectedBreeds, setErrorMessage]);

  const getDogBreeds = useCallback(async () => {
    try {
      const result = await ApiService.getDogBreeds();
      setDogBreeds(result.data);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  }, [setErrorMessage]);

  useEffect(() => {
    getDogBreeds();
  }, [getDogBreeds]);

  useEffect(() => {
    getDogs();
  }, [getDogs]);

  const setFavorite = useCallback((id: string, value: boolean) => {
    if (value) {
      setFavorites(prev => [...prev, id]);
    } else {
      setFavorites(prev => prev.filter(dogId => dogId !== id));
    }
  }, []);

  const updateBreeds = useCallback((value: string[]) => {
    setSelectedBreeds(value);
    setPage(0);
  }, []);

  return (
    <Box className={styles.boxContainer}>
      <LogoutHeader />
      <Paper
        className={styles.listContainer}
        elevation={4}
        sx={{
          marginX: columnMap[width] < 3 ? '0' : '1rem',
          borderRadius: columnMap[width] < 3 ? '0' : '12px',
          boxSizing: columnMap[width] < 3 ? 'content-box' : 'border-box',
        }}
      >
        <ImageListHeader
          page={page}
          onPageChange={setPage}
          count={count}
          breeds={dogBreeds}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={updateBreeds}
          sort={sort}
          setSort={setSort}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <Masonry
          columns={columnMap[width]}
          spacing={0}
          sx={{ overflow: 'hidden' }}
        >
          {dogs.map(dog => (
            <DogImageItem
              dog={dog}
              key={dog.id}
              onFavorite={setFavorite}
              favorites={favorites}
            />
          ))}
        </Masonry>
        <Box className={styles.bottomPageContainer}>
          <Pagination page={page} count={count} onPageChange={setPage} />
        </Box>
      </Paper>
    </Box>
  );
}
