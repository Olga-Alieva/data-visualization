import { memo, useEffect, useMemo, useState, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider/hooks';
import { Box, LinearProgress, Alert } from '@mui/material';
import { setError, setIsLoading } from 'entities/Data/slice/DataSlice';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { toggleTagsToRender } from 'widgets/DataFilters/model/slice/tagsSlice';
import { DataToRenderType } from '../types';
import { colors } from '../config';

export const DataChart = memo(() => {
  const worker: Worker = useMemo(
    () => new Worker(new URL('../services/dataToRender.ts', import.meta.url)),
    []
  );

  const [data, setData] = useState<DataToRenderType[]>([]);
  const [, startTransition] = useTransition();

  const { rawArrayDataLength, dataIds, isLoading } = useAppSelector((state) => state.data);
  const { selectedTags, selectedDataTypes, selectedTagsToRender, numberOfDots } = useAppSelector(
    (state) => state.filters
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.Worker) {
      worker.onmessage = (e: MessageEvent<Record<string, string>[]>) => {
        if ('error' in e.data) {
          return dispatch(setError('Error processing file'));
        }
        startTransition(() => setData(e.data));
        dispatch(setIsLoading(false));
      };
    }
  }, [dispatch, worker]);

  useEffect(() => {
    if (window.Worker && rawArrayDataLength !== 0 && selectedTagsToRender.length > 0) {
      dispatch(setIsLoading(true));
      worker.postMessage({ dataIds, selectedTagsToRender, numberOfDots, rawArrayDataLength });
    }
  }, [worker, numberOfDots, rawArrayDataLength, dispatch, dataIds, selectedTagsToRender]);

  useEffect(() => {
    dispatch(toggleTagsToRender());
  }, [selectedDataTypes, selectedTags, dispatch]);

  if (rawArrayDataLength === 0) {
    return null;
  }

  if (data.length === 0 || selectedTags.length === 0) {
    return <Alert severity="info">Please selected the parameters to display the data</Alert>;
  }

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="95%" maxHeight={500}>
      <ComposedChart data={data} style={{ fontFamily: `"Roboto","Helvetica","Arial",sans-serif` }}>
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />

        <XAxis
          tick={false}
          dataKey="time"
          type="number"
          label={{ value: 'Time', position: 'insideBottomRight', offset: 0 }}
        />
        <YAxis type="number" label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />

        {selectedTags?.map((item, i) => (
          <Scatter key={item} name={item} dataKey={item} fill={colors[i]} />
        ))}

        {selectedTagsToRender
          ?.filter((tag) => tag.tag.includes('mean'))
          ?.map((tag, i) => (
            <Line
              key={tag.tag}
              dataKey={tag.tag}
              stroke={colors[i]}
              dot={false}
              activeDot={false}
              legendType="none"
            />
          ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
});
