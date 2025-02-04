import { TablePagination } from '@mui/material';
import { teal } from '@mui/material/colors';

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
          previousButton: { sx: { color: teal['600'] } },
          nextButton: { sx: { color: teal['600'] } },
        },
      }}
      rowsPerPageOptions={[]}
      count={count}
      rowsPerPage={50}
      onPageChange={(_event, page) => onPageChange(page)}
    />
  );
}
