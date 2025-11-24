'use client';
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { SeriesItemIdentifierWithData } from '../models';
import { useChartContext } from '../context/ChartProvider';
import { UseChartHighlightSignature } from '../internals/plugins/featurePlugins/useChartHighlight';
import { UseChartTooltipSignature } from '../internals/plugins/featurePlugins/useChartTooltip';
import { ChartSeriesType, type ChartItemIdentifierWithData } from '../models/seriesType/config';
import { ChartInstance } from '../internals/plugins/models';

function onPointerDown(event: React.PointerEvent) {
  if (
    'hasPointerCapture' in event.currentTarget &&
    event.currentTarget.hasPointerCapture(event.pointerId)
  ) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}

export const useInteractionItemProps = (
  data: SeriesItemIdentifierWithData,
  skip?: boolean,
): {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
} => {
  const { instance } =
    useChartContext<[UseChartTooltipSignature, UseChartHighlightSignature]>();
  const interactionActive = React.useRef(false);
  const onPointerEnter = useEventCallback(() => {
    interactionActive.current = true;
    instance.setTooltipItem(data, { interaction: 'pointer' });
    instance.setHighlight(data);
  });

  const onPointerLeave = useEventCallback(() => {
    interactionActive.current = false;
    instance.removeTooltipItem(data);
    instance.clearHighlight();
  });

  React.useEffect(() => {
    return () => {
      /* Clean up state if this item is unmounted while active. */
      if (interactionActive.current) {
        onPointerLeave();
      }
    };
  }, [onPointerLeave]);

  return React.useMemo(
    () =>
      skip
        ? {}
        : {
          onPointerEnter,
          onPointerLeave,
          onPointerDown,
        },
    [skip, onPointerEnter, onPointerLeave],
  );
};

export const useInteractionAllItemProps = (
  data: SeriesItemIdentifierWithData[],
  skip?: boolean,
) => {
  const { instance } =
    useChartContext<[UseChartTooltipSignature, UseChartHighlightSignature]>();

  const results = React.useMemo(() => {
    return data.map((item) => {
      return skip ? {} : getInteractionItemProps(instance, item);
    });
  }, [data, instance, skip]);

  return results;
};

export function getInteractionItemProps(
  instance: ChartInstance<[UseChartTooltipSignature, UseChartHighlightSignature]>,
  item: ChartItemIdentifierWithData<ChartSeriesType>,
): {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
} {
  function onPointerEnter() {
    if (!item) {
      return;
    }
    instance.setTooltipItem(item, { interaction: 'pointer' });
    instance.setHighlight(item);
  }

  function onPointerLeave() {
    if (!item) {
      return;
    }
    instance.removeTooltipItem(item);
    instance.clearHighlight();
  }

  return {
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
  };
}
