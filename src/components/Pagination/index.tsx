import { TablePagination } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export default function Pagination(props: {
  page: number;
  count: number;
  onPageChange: (page: number) => void;
}) {
  const { page, onPageChange, count } = props;

  return (
    <TablePagination
      sx={{ border: 0 }}
      page={page}
      slotProps={{
        actions: {
          previousButtonIcon: { sx: { color: deepOrange['A400'] } },
          nextButtonIcon: { sx: { color: deepOrange['A400'] } },
        },
      }}
      rowsPerPageOptions={[]}
      count={count}
      rowsPerPage={50}
      onPageChange={(_event, page) => onPageChange(page)}
    />
  );
}
