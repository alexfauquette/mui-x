import {
  scaleOrdinal,
  scaleThreshold,
  scaleSequential,
  ScaleOrdinal,
  ScaleSequential,
  ScaleThreshold,
} from '@mui/x-charts-vendor/d3-scale';
import {
  ContinuousColorConfig,
  PiecewiseColorConfig,
  OrdinalColorConfig,
} from '../models/colorMapping';

export function getSequentialColorScale<Value extends number | Date>(
  config: ContinuousColorConfig<Value> | PiecewiseColorConfig<Value>,
): ScaleSequential<string, string> | ScaleThreshold<Value, string, never> {
  if (config.type === 'piecewise') {
    return scaleThreshold(config.thresholds, config.colors);
  }

  return scaleSequential([config.min ?? 0, config.max ?? 100], config.color);
}

export function getOrdinalColorScale<Value extends number | Date | string>(
  config: OrdinalColorConfig<Value>,
): ScaleOrdinal<Value, string, null | string> | ScaleOrdinal<number, string, null | string> {
  if (config.values) {
    return scaleOrdinal(config.values, config.colors).unknown(config.unknownColor ?? null);
  }
  return scaleOrdinal(
    config.colors.map((_, index) => index),
    config.colors,
  ).unknown(config.unknownColor ?? null);
}

type RemoveString<Type extends number | Date | string> = Type extends number | Date ? Type : never;

export function getColorScale(config: ContinuousColorConfig): ScaleSequential<string, string>;
export function getColorScale<Value extends number | Date>(
  config: PiecewiseColorConfig<Value>,
): ScaleThreshold<Value, string>;
export function getColorScale<Value extends number | Date | string>(
  config: OrdinalColorConfig<Value>,
): ScaleOrdinal<Value, string, null | string> | ScaleOrdinal<number, string, null | string>;
export function getColorScale<Value extends number | Date | string>(
  config:
    | ContinuousColorConfig
    | PiecewiseColorConfig<RemoveString<Value>>
    | OrdinalColorConfig<Value>,
):
  | ScaleSequential<string, string>
  | ScaleThreshold<Value, string>
  | ScaleOrdinal<Value, string, null | string>
  | ScaleOrdinal<number, string, null | string> {
  if (config.type === 'ordinal') {
    return getOrdinalColorScale(config);
  }

  return getSequentialColorScale(
    config as
      | ContinuousColorConfig<RemoveString<Value>>
      | PiecewiseColorConfig<RemoveString<Value>>,
  );
}
