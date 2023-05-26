export type tagsSliceSchema = {
  error: string | null;
  tags: string[];
  selectedTagsToRender: SelectedTagType[];
  selectedTags: string[];
  selectedDataTypes: string[];
  numberOfDots: number;
};

export type SelectedTagType = {
  tag: string;
  index: number;
};
