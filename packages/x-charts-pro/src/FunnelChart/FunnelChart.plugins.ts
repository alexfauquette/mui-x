import {
  ConvertSignaturesIntoPlugins,
  useChartHighlight,
  UseChartHighlightSignature,
  useChartInteraction,
  UseChartInteractionSignature,
} from '@mui/x-charts/internals';
import {
  useChartProExport,
  UseChartProExportSignature,
} from '../internals/plugins/useChartProExport';
import { useChartFunnelAxis } from './funnelAxisPlugin/useChartFunnelAxis';
import { UseChartFunnelAxisSignature } from './funnelAxisPlugin/useChartFunnelAxis.types';
import { useChartTooltip, UseChartTooltipSignature } from '../plugins';

export type FunnelChartPluginSignatures = [
  UseChartFunnelAxisSignature,
  UseChartInteractionSignature,
  UseChartHighlightSignature,
  UseChartTooltipSignature,
  UseChartProExportSignature,
];

export const FUNNEL_CHART_PLUGINS: ConvertSignaturesIntoPlugins<FunnelChartPluginSignatures> = [
  useChartFunnelAxis,
  useChartInteraction,
  useChartHighlight,
  useChartTooltip,
  useChartProExport,
];
