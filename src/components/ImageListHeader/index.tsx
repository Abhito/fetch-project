import {
  Autocomplete,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ImageListHeaderProps } from './ImageListHeader.interface.ts';
import styles from './styles.module.scss';
import MatchButton from '../MatchButton';
import Pagination from '../Pagination';
import { deepOrange } from '@mui/material/colors';

export default function ImageListHeader(props: ImageListHeaderProps) {
  const {
    page,
    onPageChange,
    count,
    breeds,
    selectedBreeds,
    setSelectedBreeds,
    sort,
    setSort,
    favorites,
    setFavorites,
  } = props;

  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.filterContainer}>
        <Autocomplete
          limitTags={2}
          multiple
          options={breeds}
          id='tags-outlined'
          filterSelectedOptions
          value={selectedBreeds}
          onChange={(_event, value, reason) => {
            if (
              reason === 'selectOption' ||
              reason === 'removeOption' ||
              reason === 'clear'
            ) {
              setSelectedBreeds(value);
            }
          }}
          renderInput={params => (
            <TextField {...params} label='Filter' placeholder={'Breeds'} />
          )}
          sx={{
            flex: 1,
            '& .MuiInputLabel-shrink': { color: deepOrange['A400'] },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: deepOrange['A400'],
              },
            },
            '& .MuiSvgIcon-root ': {
              fill: deepOrange['A400'],
            },
          }}
        />
        <FormControl
          sx={{
            minWidth: '80px',
            '& .MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: deepOrange['A400'],
              },
            },
            '& .MuiSvgIcon-root ': {
              fill: deepOrange['A400'],
            },
          }}
        >
          <InputLabel style={{ color: deepOrange['A400'] }}>Sort</InputLabel>
          <Select
            label={'Sort'}
            value={sort}
            onChange={event => {
              setSort(event.target.value as 'asc' | 'desc');
            }}
            defaultValue={'asc'}
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value={'asc'}>ASC</MenuItem>
            <MenuItem value={'desc'}>DESC</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.buttonContainer}>
        <MatchButton favorites={favorites} setFavorites={setFavorites} />
        <Pagination page={page} count={count} onPageChange={onPageChange} />
      </Box>
    </Box>
  );
}
