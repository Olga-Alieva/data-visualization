import { RootState } from 'app/providers/StoreProvider/config/store';

export const getIsFileUploaded = (state: RootState) => state.fileUpload.isFileUploaded;

export const getIsFileParcing = (state: RootState) => state.fileUpload.isFileParcing;

export const getError = (state: RootState) => state.fileUpload.error;
