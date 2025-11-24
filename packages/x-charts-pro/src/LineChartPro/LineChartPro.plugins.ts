import {
  useChartZAxis,
  UseChartZAxisSignature,
  useChartCartesianAxis,
  UseChartCartesianAxisSignature,
  useChartInteraction,
  UseChartInteractionSignature,
  useChartHighlight,
  UseChartHighlightSignature,
  useChartKeyboardNavigation,
  UseChartKeyboardNavigationSignature,
  useChartBrush,
  UseChartBrushSignature,
  ConvertSignaturesIntoPlugins,
} from '@mui/x-charts/internals';
import { useChartTooltip, UseChartTooltipSignature } from '@mui/x-charts/plugins';
import {
  useChartProExport,
  UseChartProExportSignature,
} from '../internals/plugins/useChartProExport';
import { useChartProZoom, UseChartProZoomSignature } from '../internals/plugins/useChartProZoom';

export type LineChartProPluginSignatures = [
  UseChartZAxisSignature,
  UseChartBrushSignature,
  UseChartInteractionSignature,
  UseChartCartesianAxisSignature<'line'>,
  UseChartHighlightSignature,
  UseChartKeyboardNavigationSignature,
  UseChartTooltipSignature,
  UseChartProZoomSignature,
  UseChartProExportSignature,
];

export const LINE_CHART_PRO_PLUGINS: ConvertSignaturesIntoPlugins<LineChartProPluginSignatures> = [
  useChartZAxis,
  useChartBrush,
  useChartInteraction,
  useChartCartesianAxis,
  useChartHighlight,
  useChartKeyboardNavigation,
  useChartTooltip,
  useChartProZoom,
  useChartProExport,
];
