import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      direction="row"
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
};

export default Loader;
