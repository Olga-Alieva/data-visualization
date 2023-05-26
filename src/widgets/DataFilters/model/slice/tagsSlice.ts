import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SelectedTagType, tagsSliceSchema } from '../schema/tagsSliceSchema';

const initialState: tagsSliceSchema = {
  error: null,
  tags: [],
  selectedTags: [],
  selectedDataTypes: [],
  selectedTagsToRender: [],
  numberOfDots: 1,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    initTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleTag: (state, action: PayloadAction<string>) => {
      const updated = state.selectedTags.includes(action.payload)
        ? state.selectedTags.filter(t => t !== action.payload)
        : [...state.selectedTags, action.payload];
      state.selectedTags = updated;
    },
    toggleDataType: (state, action: PayloadAction<string>) => {
      const updated = state.selectedDataTypes.includes(action.payload)
        ? state.selectedDataTypes.filter(dt => dt !== action.payload)
        : [...state.selectedDataTypes, action.payload];
      state.selectedDataTypes = updated;
    },
    toggleTagsToRender: state => {
      if (state.selectedTags.length === 0) {
        state.selectedTagsToRender = [];
        return;
      }
      const updated: SelectedTagType[] = [];
      state.selectedTags.forEach(tag => {
        state.selectedDataTypes.forEach(dt => {
          const index = tag.match(/\d+/)?.[0];
          if (!index) return;
          const suffix = dt.includes('mean') ? '_mean' : '';
          updated.push({ tag: `${tag}${suffix}`, index: +index });
        });
      });
      state.selectedTagsToRender = updated;
    },
    setNumberOfDots: (state, action: PayloadAction<number>) => {
      state.numberOfDots = action.payload;
    },
  },
});

export const { initTags, setError, toggleDataType, toggleTag, toggleTagsToRender, setNumberOfDots } = tagsSlice.actions;

export default tagsSlice.reducer;
