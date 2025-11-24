import {
  useChartZAxis,
  UseChartZAxisSignature,
  useChartCartesianAxis,
  UseChartCartesianAxisSignature,
  useChartInteraction,
  UseChartInteractionSignature,
  useChartHighlight,
  UseChartHighlightSignature,
  useChartClosestPoint,
  UseChartClosestPointSignature,
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

export type ScatterChartProPluginSignatures = [
  UseChartZAxisSignature,
  UseChartBrushSignature,
  UseChartInteractionSignature,
  UseChartCartesianAxisSignature<'scatter'>,
  UseChartHighlightSignature,
  UseChartClosestPointSignature,
  UseChartKeyboardNavigationSignature,
  UseChartTooltipSignature,
  UseChartProZoomSignature,
  UseChartProExportSignature,
];

export const SCATTER_CHART_PRO_PLUGINS: ConvertSignaturesIntoPlugins<ScatterChartProPluginSignatures> =
  [
    useChartZAxis,
    useChartBrush,
    useChartInteraction,
    useChartCartesianAxis,
    useChartHighlight,
    useChartClosestPoint,
    useChartKeyboardNavigation,
    useChartTooltip,
    useChartProZoom,
    useChartProExport,
  ];
