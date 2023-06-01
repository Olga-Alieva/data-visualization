import localForage from 'localforage';
import { WorkerState } from 'entities/Data/schema/DataTypes';
import { DataToRenderType } from '../types';

type WorkerErrorReturnType = {
  error: string;
};

const ERROR: WorkerErrorReturnType = {
  error: 'Error processing data',
};

/* eslint-disable no-restricted-globals */
self.onmessage = async (e: MessageEvent<WorkerState>) => {
  let minTime: number = 0;
  const { selectedTagsToRender: selectedTags, dataIds: ids, numberOfDots, rawArrayDataLength } = e.data;
  const rawData = await localForage.getItem<Record<string, string[]>>('parsed');
  const dataToRender: DataToRenderType[] = [];
  try {
    for (
      let i = 0;
      i < rawArrayDataLength && dataToRender.length < numberOfDots;
      i += rawArrayDataLength / numberOfDots
    ) {
      const roundedI = Math.round(i);
      const time = ids[roundedI];
      const curTime = new Date(time).getTime();
      if (i === 0) {
        minTime = curTime;
      }
      const obj: DataToRenderType = {
        time: new Date(time).getTime() - minTime,
      };

      const curItem = rawData?.[time];
      if (!curItem) {
        return self.postMessage(ERROR);
      }
      selectedTags.forEach(async ({ tag, index }) => {
        const currentIndex = tag.includes('mean') ? index + 19 : index - 1;
        obj[tag] = +curItem?.[currentIndex];
      });

      dataToRender.push(obj);
    }
    self.postMessage(dataToRender);
  } catch (err) {
    console.error(err);
    self.postMessage(ERROR);
  }
};

export {};
