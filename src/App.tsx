import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { DataFilters } from 'widgets/DataFilters';
import { FileUpload } from 'widgets/FileUpload';
import { DataChart } from 'widgets/DataChart';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
  margin: 0,
  minHeight: '100vh',
  backgroundColor: grey[200],
  paddingTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: '0',
  },
}));

const Container = styled('div')(({ theme }) => ({
  margin: 'auto',
  width: '90%',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export default function App() {
  return (
    <Root>
      <Container>
        <Paper
          sx={{
            p: 3,
          }}
        >
          <FileUpload />
          <Divider sx={{ mt: 1 }} />
          <DataFilters />
        </Paper>

        <Paper
          sx={{
            p: 3,
            flexGrow: 1,
          }}
        >
          <DataChart />
        </Paper>
      </Container>
    </Root>
  );
}
