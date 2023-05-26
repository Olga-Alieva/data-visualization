import { memo } from 'react';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { Box, Divider, GlobalStyles, Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { toggleTag } from 'widgets/DataFilters/model/slice/tagsSlice';

type FieldsFilterType = {
  tags: string[];
  selectedTags: string[];
};

export const FieldsFilter = memo(({ tags, selectedTags }: FieldsFilterType) => {
  const dispatch = useAppDispatch();

  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <GlobalStyles
        styles={{
          '::-webkit-scrollbar': {
            width: '10px',
            backgroundColor: '#F5F5F5',
          },

          '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundImage: `-webkit-gradient(linear,
									   left bottom,
									   left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)))`,
          },
        }}
      />
      <Box
        mt={4}
        style={{ maxHeight: 120, overflow: 'auto', overflowX: 'hidden' }}
        sx={{
          p: 2,
          paddingLeft: '5px',
          borderRadius: '5px',
          maxWidth: '185px',
        }}
      >
        {tags?.map(tag => (
          <FormControlLabel
            key={tag}
            style={{ width: '100%' }}
            control={<Checkbox checked={selectedTags.map(selectedTag => selectedTag).includes(tag)} />}
            label={tag}
            onChange={() => dispatch(toggleTag(tag))}
          />
        ))}
      </Box>
      <Divider sx={{ marginTop: 3 }} />
    </>
  );
});
