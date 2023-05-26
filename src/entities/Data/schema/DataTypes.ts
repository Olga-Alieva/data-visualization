import { SelectedTagType } from 'widgets/DataFilters/model/schema/tagsSliceSchema';

export type RawDataType = Record<string, string>;

export interface WorkerState {
  dataIds: string[];
  selectedTagsToRender: SelectedTagType[];
  numberOfDots: number;
  rawArrayDataLength: number;
  selectedDataTypes: string[];
}

export interface DataSchema {
  isLoading: boolean;
  error: null | string;
  rawData: Record<string, RawDataType>;
  dataIds: string[];
  rawArrayDataLength: number;
}
