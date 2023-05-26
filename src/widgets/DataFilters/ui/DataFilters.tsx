import { memo } from 'react';
import { Divider, Stack, useTheme } from '@mui/material';
import { useAppSelector } from 'app/providers/StoreProvider/hooks';
import { DataTypeFilter } from 'features/DataTypeFilter';
import { FieldsFilter } from 'features/FieldsFilter';
import { NumberOfDotsInput } from 'widgets/NumberOfDotsInput';

export const DataFilters = memo(() => {
  const { tags, selectedTags } = useAppSelector(state => state.filters);
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px',
        },
        [theme.breakpoints.up('md')]: {
          flexDirection: 'column',
          gap: '5px',
        },
      }}
    >
      <FieldsFilter tags={tags} selectedTags={selectedTags} />
      <DataTypeFilter />
      <Divider sx={{ marginTop: 1, marginBottom: 1, flexGrow: 1, flexBasis: '100%' }} />
      <NumberOfDotsInput />
    </Stack>
  );
});
