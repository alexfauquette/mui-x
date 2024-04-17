import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { ChartsLoadingOverlay } from './ChartsLoadingOverlay';
import { useSeries } from '../hooks/useSeries';
import { SeriesId } from '../models/seriesType/common';
import { ChartsNoDataOverlay } from './ChartsNoDataOverlay';

export function useNoData() {
  const seriesPerType = useSeries();

  return Object.values(seriesPerType).every((seriesOfGivenType) => {
    if (!seriesOfGivenType) {
      return true;
    }
    const { series, seriesOrder } = seriesOfGivenType;

    return seriesOrder.every((seriesId: SeriesId) => series[seriesId].data.length === 0);
  });
}

export type CommonOverlayProps = React.SVGAttributes<SVGTextElement> & {
  sx?: SxProps<Theme>;
};

export interface ChartsOverlaySlots {
  /**
   * Loading overlay component rendered when the chart is in a loading state.
   * @default ChartsLoadingOverlay
   */
  loadingOverlay?: React.ElementType<CommonOverlayProps>;
  /**
   * No data overlay component rendered when the chart has no data to display.
   * @default ChartsNoDataOverlay
   */
  noDataOverlay?: React.ElementType<CommonOverlayProps>;
}
export interface ChartsOverlaySlotProps {
  loadingOverlay?: Partial<CommonOverlayProps>;
  noDataOverlay?: Partial<CommonOverlayProps>;
}

export interface ChartsOverlayProps {
  /**
   * If `true`, a  loading overlay is displayed.
   */
  loading?: boolean;

  slots?: ChartsOverlaySlots;
  slotProps?: ChartsOverlaySlotProps;
}

export function ChartsOverlay(props: ChartsOverlayProps) {
  const noData = useNoData();

  if (props.loading) {
    const LoadingOverlay = props.slots?.loadingOverlay ?? ChartsLoadingOverlay;
    return <LoadingOverlay {...props.slotProps?.loadingOverlay} />;
  }
  if (noData) {
    const NoDataOverlay = props.slots?.noDataOverlay ?? ChartsNoDataOverlay;
    return <NoDataOverlay {...props.slotProps?.noDataOverlay} />;
  }
  return null;
}
