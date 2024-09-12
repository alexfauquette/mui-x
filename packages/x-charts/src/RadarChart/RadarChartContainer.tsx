import * as React from 'react';

import { DrawingProvider, DrawingProviderProps } from '../context/DrawingProvider';
import { SeriesProvider, SeriesProviderProps } from '../context/SeriesProvider';
import { InteractionProvider } from '../context/InteractionProvider';
import { ChartsSurface, ChartsSurfaceProps } from '../ChartsSurface';
import { RadialProvider, RadialProviderProps } from '../context/RadialProvider';
import { ChartsAxesGradients } from '../internals/components/ChartsAxesGradients';
import {
  HighlightedProvider,
  HighlightedProviderProps,
  ZAxisContextProvider,
  ZAxisContextProviderProps,
} from '../context';
import { PluginProvider, PluginProviderProps } from '../context/PluginProvider';
import { useRadarChartContainerProps } from './useRadarChartContainerProps';
import { RadarConfig } from './Radar.types';

export type RadarChartContainerProps = Omit<
  ChartsSurfaceProps &
    Omit<SeriesProviderProps, 'seriesFormatters'> &
    Omit<DrawingProviderProps, 'svgRef'> &
    Pick<RadialProviderProps, 'dataset'> &
    ZAxisContextProviderProps &
    HighlightedProviderProps &
    PluginProviderProps,
  'children'
> & {
  radar: RadarConfig;
  children?: React.ReactNode;
};

export const RadarChartContainer = React.forwardRef(function RadarChartContainer(
  props: RadarChartContainerProps,
  ref,
) {
  const {
    children,
    drawingProviderProps,
    seriesProviderProps,
    radialProviderProps,
    zAxisContextProps,
    highlightedProviderProps,
    chartsSurfaceProps,
    pluginProviderProps,
  } = useRadarChartContainerProps(props, ref);

  return (
    <DrawingProvider {...drawingProviderProps}>
      <PluginProvider {...pluginProviderProps}>
        <SeriesProvider {...seriesProviderProps}>
          <RadialProvider {...radialProviderProps}>
            <ZAxisContextProvider {...zAxisContextProps}>
              <InteractionProvider>
                <HighlightedProvider {...highlightedProviderProps}>
                  <ChartsSurface {...chartsSurfaceProps}>
                    <ChartsAxesGradients />
                    {children}
                  </ChartsSurface>
                </HighlightedProvider>
              </InteractionProvider>
            </ZAxisContextProvider>
          </RadialProvider>
        </SeriesProvider>
      </PluginProvider>
    </DrawingProvider>
  );
});