import {
  scaleLog,
  scalePow,
  scaleSqrt,
  scaleTime,
  scaleUtc,
  scaleLinear,
  ScalePower,
  ScaleLogarithmic,
  ScaleTime,
  ScaleLinear,
} from '@mui/x-charts-vendor/d3-scale';
import { ContinuousScaleName, D3ContinuousScale } from '../models/axis';

export function getScale(scaleType: 'log', domain: any[], range: any[]): ScaleLogarithmic<any, any>;
export function getScale(scaleType: 'pow', domain: any[], range: any[]): ScalePower<any, any>;
export function getScale(scaleType: 'sqrt', domain: any[], range: any[]): ScaleLinear<any, any>;
export function getScale(scaleType: 'time', domain: any[], range: any[]): ScaleTime<any, any>;
export function getScale(scaleType: 'utc', domain: any[], range: any[]): ScaleTime<any, any>;
export function getScale(scaleType: 'linear', domain: any[], range: any[]): ScaleLinear<any, any>;
export function getScale(scaleType: ContinuousScaleName, domain: any[], range: any[]) {
  switch (scaleType) {
    case 'log':
      return scaleLog(domain, range);
    case 'pow':
      return scalePow(domain, range);
    case 'sqrt':
      return scaleSqrt(domain, range);
    case 'time':
      return scaleTime(domain, range);
    case 'utc':
      return scaleUtc(domain, range);
    default:
      return scaleLinear(domain, range);
  }
}
