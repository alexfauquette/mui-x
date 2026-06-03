import { type ChartPluginSignature } from '@mui/x-charts/internals';
import type { GeoProjection, ExtendedFeatureCollection } from '@mui/x-charts-vendor/d3-geo';

export type D3NamedProjection =
  | 'azimuthalEqualArea'
  | 'azimuthalEquidistant'
  | 'gnomonic'
  | 'orthographic'
  | 'stereographic'
  | 'conicConformal'
  | 'conicEqualArea'
  | 'conicEquidistant'
  | 'albers'
  | 'albersUsa'
  | 'equirectangular'
  | 'mercator'
  | 'transverseMercator'
  | 'equalEarth'
  | 'naturalEarth1';

/**
 * A d3-geo projection accepted by `useGeoProjection`.
 *
 * Either a built-in projection name (e.g. `'mercator'`, `'naturalEarth1'`)
 * or a `GeoProjection` instance returned by a d3-geo factory.
 */
export type GeoProjectionInput = D3NamedProjection | GeoProjection;

export type GeoJsonProperties = { [name: string]: any } | null;

export interface UseGeoProjectionParameters {
  /**
   * The GeoJSON `FeatureCollection` whose features will be rendered on the map.
   */
  geoData?: ExtendedFeatureCollection;
  /**
   * Helper to extract a name from GeoJson properties.
   * The name is the key used to map data to the GeoJson features, so it should be unique for each feature.
   * It can be either a string, in which case it will be used as the key to access the name in the feature properties,
   * or a function that takes the feature properties and returns the name.
   * @default 'name'
   */
  featuresName?: string | ((feature: GeoJsonProperties) => string);
  /**
   * The d3-geo projection used to map geographic coordinates to SVG coordinates.
   * Accepts a d3-geo projection name (e.g. `'mercator'`, `'naturalEarth1'`)
   * or a custom `GeoProjection` instance.
   */
  projection?: GeoProjectionInput;
  /**
   * The center of the projection, specified as a `[longitude, latitude]` pair in degrees.
   */
  translate?: [number, number];
  /**
   * The rotation of the projection, specified as a `[longitude, latitude]` pair in degrees.
   */
  rotate?: [number, number];
  /**
   * The scale of the projection.
   * Id not provided the scale will default to fit the entire geoData in the drawing area.
   */
  scale?: number;
}

export type UseGeoProjectionDefaultizedParameters = UseGeoProjectionParameters;

export interface UseGeoProjectionState {
  geoProjection: {
    geoData: ExtendedFeatureCollection | null;
    featuresName: string | ((feature: GeoJsonProperties) => string) | undefined;
    projection: GeoProjectionInput | null;
    translate: [number, number] | null;
    rotate: [number, number] | null;
    scale: number | null;
    /**
     * The two standard parallels used by conic projections, if applicable.
     * Used for projection 'conicConformal', 'conicEqualArea', 'conicEquidistant'.
     */
    parallels?: [number, number] | null;
  };
}

export type UseGeoProjectionSignature = ChartPluginSignature<{
  params: UseGeoProjectionParameters;
  defaultizedParams: UseGeoProjectionDefaultizedParameters;
  state: UseGeoProjectionState;
}>;
