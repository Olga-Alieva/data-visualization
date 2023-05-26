import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FileUploadSchema } from '../schema/FileUploadSchema';

const initialState: FileUploadSchema = {
  isFileUploaded: false,
  isFileParcing: false,
  error: null,
};

export const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState,
  reducers: {
    setIsFileUploaded: (state, action: PayloadAction<boolean>) => {
      state.isFileUploaded = action.payload;
    },
    setIsFileParcing: (state, action: PayloadAction<boolean>) => {
      state.isFileParcing = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setIsFileUploaded, setIsFileParcing, setError } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
