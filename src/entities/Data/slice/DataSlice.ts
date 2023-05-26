import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DataSchema } from '../schema/DataTypes';

const initialState: DataSchema = {
  isLoading: false,
  error: null,
  rawData: {},
  dataIds: [],
  rawArrayDataLength: 0,
};

type InitDataType = { ids: string[]; totalEntries: number };

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<InitDataType>) => {
      const { ids, totalEntries } = action.payload;
      state.dataIds = ids;
      state.rawArrayDataLength = totalEntries;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { initData, setError, setIsLoading } = dataSlice.actions;

export default dataSlice.reducer;
