import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { initData } from 'entities/Data/slice/DataSlice';
import { FileInput } from 'widgets/FileInput';
import { initTags, setNumberOfDots } from 'widgets/DataFilters/model/slice/tagsSlice';
import { getError, getIsFileParcing, getIsFileUploaded } from '../model/selectors';
import { setError, setIsFileUploaded, setIsFileParcing } from '../model/slice/FileUploadSlice';
import { parseCSVData } from '../lib/parseCsvData';

export const FileUpload = memo(() => {
  const theme = useTheme();

  const isFileUploaded = useSelector(getIsFileUploaded);
  const isFileParcing = useSelector(getIsFileParcing);
  const error = useSelector(getError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const dbs = await window.indexedDB.databases();
      dbs.forEach(db => {
        if (db.name) {
          window.indexedDB.deleteDatabase(db.name);
        }
      });
    })();
  }, []);

  const onFileUpload = useCallback(
    (file: File) => {
      dispatch(setError(null));
      dispatch(setIsFileParcing(true));
      dispatch(setIsFileUploaded(false));

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const text = e.target?.result;
        if (!text || typeof text !== 'string') {
          return dispatch(setError('Error while parsing csv file'));
        }
        const result = parseCSVData(text);
        if ('error' in result) {
          console.error(result.error);
          dispatch(setError(result.error));
          dispatch(setIsFileUploaded(false));
          dispatch(setIsFileParcing(false));
          return;
        }
        const { tags, ids, numberOfDots, totalEntries } = result;

        dispatch(initData({ ids, totalEntries }));
        dispatch(setNumberOfDots(numberOfDots));
        dispatch(initTags(tags));

        dispatch(setIsFileUploaded(true));
        dispatch(setIsFileParcing(false));
      };
      reader.readAsText(file);
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        paddingBottom: 2,
        borderRadius: '5px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          gap: '25px',
        },
        [theme.breakpoints.up('md')]: {
          width: 200,
          gap: '15px',
          flexDirection: 'column',
          alignItems: 'start',
        },
      }}
    >
      <Typography>Select file (.csv)</Typography>

      {isFileParcing ? (
        <CircularProgress variant="indeterminate" disableShrink={true} size={36} />
      ) : (
        <FileInput disabled={isFileParcing} onFileUpload={onFileUpload} />
      )}

      {isFileUploaded && <Alert severity="success">File Uploaded</Alert>}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
});
