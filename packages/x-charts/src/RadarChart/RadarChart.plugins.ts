import {
  useChartPolarAxis,
  UseChartPolarAxisSignature,
} from '../internals/plugins/featurePlugins/useChartPolarAxis';
import {
  useChartInteraction,
  UseChartInteractionSignature,
} from '../internals/plugins/featurePlugins/useChartInteraction';
import {
  useChartHighlight,
  UseChartHighlightSignature,
} from '../internals/plugins/featurePlugins/useChartHighlight';
import {
  useChartTooltip,
  UseChartTooltipSignature,
} from '../internals/plugins/featurePlugins/useChartTooltip';

export const RADAR_PLUGINS = [
  useChartInteraction,
  useChartPolarAxis,
  useChartHighlight,
  useChartTooltip,
] as const;

export type RadarChartPluginSignatures = [
  UseChartInteractionSignature,
  UseChartPolarAxisSignature,
  UseChartHighlightSignature,
  UseChartTooltipSignature,
];
