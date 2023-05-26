import { TextField, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/hooks';
import { useDebounce } from 'app/lib/hooks/useDebounce';
import { setError, setIsLoading } from 'entities/Data/slice/DataSlice';
import { memo, useCallback, useEffect, useState } from 'react';
import { setNumberOfDots } from 'widgets/DataFilters/model/slice/tagsSlice';

export const NumberOfDotsInput = memo(() => {
  const { rawArrayDataLength, error, isLoading } = useAppSelector(state => state.data);
  const { numberOfDots } = useAppSelector(state => state.filters);
  const [value, setValue] = useState(numberOfDots);
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newNumberOfDots = +e.target.value;
      dispatch(setError(null));

      if (newNumberOfDots > rawArrayDataLength) {
        dispatch(setIsLoading(false));
        return dispatch(setError(`Число точек не должно превышать кол-во строк в таблице`));
      } else if (newNumberOfDots <= 0) {
        dispatch(setIsLoading(false));
        return dispatch(setError(`Число точек должно быть больше нуля`));
      } else {
        setValue(newNumberOfDots);
        dispatch(setIsLoading(false));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rawArrayDataLength]
  );

  const debouncedInput = useDebounce<number>(value, 500);

  useEffect(() => {
    if (debouncedInput) {
      dispatch(setIsLoading(true));
      dispatch(setError(null));
      dispatch(setNumberOfDots(debouncedInput));
      dispatch(setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    setValue(numberOfDots);
  }, [numberOfDots]);

  return (
    <Box
      mt={3}
      sx={{
        width: 200,
      }}
    >
      <TextField
        error={Boolean(error)}
        id="outlined-number"
        label="Число точек"
        type="number"
        disabled={isLoading || rawArrayDataLength === 0}
        onChange={handleChange}
        value={value.toString()}
        helperText={error}
        inputProps={{ inputMode: 'numeric', pattern: '/^[1-9]d*(d+)?$/i' }}
      />
    </Box>
  );
});
