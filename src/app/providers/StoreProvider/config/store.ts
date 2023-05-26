import { configureStore } from '@reduxjs/toolkit';
import dataReducer from 'entities/Data/slice/DataSlice';
import fileUploadReducer from 'widgets/FileUpload/model/slice/FileUploadSlice';
import tagsSliceReducer from 'widgets/DataFilters/model/slice/tagsSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    fileUpload: fileUploadReducer,
    filters: tagsSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
