import {
  useChartZAxis,
  UseChartZAxisSignature,
  useChartCartesianAxis,
  UseChartCartesianAxisSignature,
  useChartInteraction,
  UseChartInteractionSignature,
  useChartHighlight,
  UseChartHighlightSignature,
  ConvertSignaturesIntoPlugins,
} from '@mui/x-charts/internals';
import { useChartTooltip, UseChartTooltipSignature } from '@mui/x-charts/plugins';
import {
  useChartProExport,
  UseChartProExportSignature,
} from '../internals/plugins/useChartProExport';

export type HeatmapPluginSignatures = [
  UseChartZAxisSignature,
  UseChartInteractionSignature,
  UseChartCartesianAxisSignature<'heatmap'>,
  UseChartHighlightSignature,
  UseChartTooltipSignature,
  UseChartProExportSignature,
];

export const HEATMAP_PLUGINS = [
  useChartZAxis,
  useChartInteraction,
  useChartCartesianAxis,
  useChartHighlight,
  useChartTooltip,
  useChartProExport,
] as ConvertSignaturesIntoPlugins<HeatmapPluginSignatures>;
