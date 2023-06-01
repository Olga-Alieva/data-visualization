import localForage from 'localforage';
import { RawDataType } from 'entities/Data/schema/DataTypes';

type parseCSVDataReturnTypeSuccess = {
  tags: string[];
  ids: string[];
  numberOfDots: number;
  totalEntries: number;
};

type parseCSVDataReturnTypeError = {
  error: string;
};

type parseCSVDataReturnType = parseCSVDataReturnTypeSuccess | parseCSVDataReturnTypeError;

export const parseCSVData = (csvData: string): parseCSVDataReturnType => {
  const t0 = performance.now();

  let totalEntries = 0;
  const ids: string[] = [];

  const lines = csvData.split('\r\n');
  if (lines.length === 0) {
    return {
      error: 'File contains no data',
    };
  }
  const headerLine = lines[0];
  const headers = headerLine.split(',');
  const allTags = headers.slice(1);

  if (allTags.some((tag) => !tag.includes('tag'))) {
    return {
      error: 'Incorrect data format',
    };
  }

  const tags = allTags.filter((tag) => !tag.includes('mean'));

  const parsed: Record<string, string[]> = {};

  lines.slice(1).forEach((line) => {
    totalEntries++;
    const [time, ...splittedLine] = line.split(',');
    parsed[time] = splittedLine;
  });

  const parsedData: Record<string, RawDataType> = {};

  lines.slice(1).forEach((line) => {
    const obj: Record<string, string> = {};
    const splittedLine = line.split(',');
    splittedLine.forEach((value, i) => {
      obj[headers[i]] = value;
    });
    ids.push(splittedLine[0]);
    parsedData[splittedLine[0]] = obj;
  });

  localForage.setItem('parsed', parsed);

  const numberOfDots = Math.min(1000, ids.length);
  const t1 = performance.now();
  console.debug(`🚀 CSV Parsed in ${t1 - t0} milliseconds.`);

  return { tags, ids, numberOfDots, totalEntries };
};
