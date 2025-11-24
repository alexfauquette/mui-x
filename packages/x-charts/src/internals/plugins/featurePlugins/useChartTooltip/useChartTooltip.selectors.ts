import { createSelector } from '@mui/x-internals/store';
import {
  ChartItemIdentifier,
  ChartSeriesDefaultized,
  ChartSeriesType,
} from '../../../../models/seriesType/config';
import {
  ProcessedSeries,
  selectorChartSeriesConfig,
  selectorChartSeriesProcessed,
} from '../../corePlugins/useChartSeries';
import { TooltipPositionGetterAxesConfig } from '../../models/seriesConfig/tooltipItemPositionGetter.types';
import {
  selectorChartXAxis,
  selectorChartYAxis,
} from '../useChartCartesianAxis/useChartCartesianAxisRendering.selectors';
import {
  selectorChartsKeyboardItem,
  selectorChartsKeyboardItemIsDefined,
} from '../useChartKeyboardNavigation';
import {
  selectorChartsInteractionItem,
  selectorChartsInteractionItemIsDefined,
  selectorChartsLastInteraction,
} from '../useChartInteraction/useChartInteraction.selectors';
import { ChartSeriesConfig } from '../../models/seriesConfig/seriesConfig.types';
import { AxisId, ChartsXAxisProps, ChartsYAxisProps } from '../../../../models/axis';
import { ComputeResult } from '../useChartCartesianAxis/computeAxisValue';
import { selectorChartDrawingArea } from '../../corePlugins/useChartDimensions/useChartDimensions.selectors';
import { ChartDrawingArea } from '../../../../hooks/useDrawingArea';
import { isCartesianSeries } from '../../../isCartesian';
import { UseChartTooltipSignature } from './useChartTooltip.types';
import { ChartOptionalRootSelector } from '../../utils/selectors';


const selectTooltipControl: ChartOptionalRootSelector<UseChartTooltipSignature> = (state) =>
  state.tooltip;

export const selectorChartsTooltipItem = createSelector(
  selectTooltipControl,
  selectorChartsLastInteraction,
  selectorChartsInteractionItem,
  selectorChartsKeyboardItem,
  (tooltipControl, lastInteraction, interactionItem, keyboardItem) => {
    if (tooltipControl?.item !== undefined) {
      return tooltipControl.item;
    }
    return lastInteraction === 'keyboard' ? keyboardItem : (interactionItem ?? null)
  }

);

export const selectorChartsTooltipItemIsDefined = createSelector(
  selectTooltipControl,
  selectorChartsLastInteraction,
  selectorChartsInteractionItemIsDefined,
  selectorChartsKeyboardItemIsDefined,

  (tooltipControl, lastInteraction, interactionItemIsDefined, keyboardItemIsDefined) => {
    if (tooltipControl?.item !== undefined) {
      return tooltipControl.item !== null;
    }

    return lastInteraction === 'keyboard' ? keyboardItemIsDefined : interactionItemIsDefined
  }
);

export const selectorChartsTooltipItemPosition = createSelector(
  selectorChartsTooltipItem,
  selectorChartDrawingArea,
  selectorChartSeriesConfig,
  selectorChartXAxis,
  selectorChartYAxis,
  selectorChartSeriesProcessed,
  (_, placement?: 'top' | 'bottom' | 'left' | 'right') => placement,

  function selectorChartsTooltipItemPosition<T extends ChartSeriesType>(
    identifier: ChartItemIdentifier<T> | null,
    drawingArea: ChartDrawingArea,
    seriesConfig: ChartSeriesConfig<T>,
    { axis: xAxis, axisIds: xAxisIds }: ComputeResult<ChartsXAxisProps>,
    { axis: yAxis, axisIds: yAxisIds }: ComputeResult<ChartsYAxisProps>,
    series: ProcessedSeries<T>,
    placement: 'top' | 'bottom' | 'left' | 'right' = 'top',
  ) {
    if (!identifier) {
      return null;
    }

    const itemSeries = series[identifier.type as T]?.series[identifier.seriesId] as
      | ChartSeriesDefaultized<T>
      | undefined;

    if (itemSeries) {
      const axesConfig: TooltipPositionGetterAxesConfig = {};

      const xAxisId: AxisId | undefined = isCartesianSeries(itemSeries)
        ? (itemSeries.xAxisId ?? xAxisIds[0])
        : undefined;
      const yAxisId: AxisId | undefined = isCartesianSeries(itemSeries)
        ? (itemSeries.yAxisId ?? yAxisIds[0])
        : undefined;

      if (xAxisId !== undefined) {
        axesConfig.x = xAxis[xAxisId];
      }
      if (yAxisId !== undefined) {
        axesConfig.y = yAxis[yAxisId];
      }

      return (
        seriesConfig[itemSeries.type as T].tooltipItemPositionGetter?.({
          series,
          drawingArea,
          axesConfig,
          identifier,
          placement,
        }) ?? null
      );
    }

    return null;
  },
);

const selectorChartsItemTooltipIsControlled = createSelector(selectTooltipControl, tooltip => tooltip?.isItemControlled ?? false);

export const selectorChartsTooltipAnchor = createSelector(
  selectorChartsLastInteraction,
  selectorChartsItemTooltipIsControlled,
  (lastInteraction, isControlled,
    /**
     * Then anchor if the state does not force it to be 'node'.
     */
    anchor: 'node' | 'pointer') => {
    return (lastInteraction === 'keyboard' || isControlled) ? 'node' : anchor;
  })
