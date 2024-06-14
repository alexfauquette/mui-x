import * as React from 'react';
import { useXScale, useYScale, useZColorScale } from '@mui/x-charts/hooks';
import { useHeatmapSeries } from '../hooks/useSeries';
import { HeatmapItem } from './HeatmapItem';

export function HeatmapPlot() {
  const xScale = useXScale<'band'>();
  const yScale = useYScale<'band'>();
  const colorScale = useZColorScale()!;
  const series = useHeatmapSeries();

  const xDomain = xScale.domain();
  const yDomain = yScale.domain();

  if (!series || series.seriesOrder.length === 0) {
    return null;
  }
  const seriesToDisplay = series.series[series.seriesOrder[0]];

  return (
    <g>
      {seriesToDisplay.data.map(([xIndex, yIndex, value], dataIndex) => {
        const x = xScale(xDomain[xIndex]);
        const y = yScale(yDomain[yIndex]);
        const color = colorScale?.(value);
        if (x === undefined || y === undefined || !color) {
          return null;
        }
        return (
          <HeatmapItem
            key={`${xIndex}_${yIndex}`}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            x={x}
            y={y}
            color={color}
            dataIndex={dataIndex}
            seriesId={series.seriesOrder[0]}
          />
        );
      })}
    </g>
  );
}
