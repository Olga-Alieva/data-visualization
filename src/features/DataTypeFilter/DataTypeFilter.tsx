import { memo, useEffect } from 'react';
import { FormGroup, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/hooks';
import { toggleDataType } from 'widgets/DataFilters/model/slice/tagsSlice';

const config = [
  {
    label: 'Original values',
    name: 'tag',
  },
  {
    label: 'Mean values',
    name: 'tag_mean',
  },
];

export const DataTypeFilter = memo(() => {
  const { rawArrayDataLength } = useAppSelector(state => state.data);
  const { selectedDataTypes } = useAppSelector(state => state.filters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedDataTypes.length === 0) {
      dispatch(toggleDataType(config[0].name));
    }
  }, [dispatch, selectedDataTypes]);

  return (
    <Box
      mt={2}
      sx={{
        p: 2,
        paddingLeft: '5px',
        borderRadius: '5px',
      }}
    >
      <FormGroup>
        {config.map(({ label, name }) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                disabled={rawArrayDataLength === 0}
                checked={selectedDataTypes.includes(name)}
                onChange={() => dispatch(toggleDataType(name))}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </Box>
  );
});
