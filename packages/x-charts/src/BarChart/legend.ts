import { LegendItemParams } from '../ChartsLegend/chartsLegend.types';
import { getLabel } from '../internals/getLabel';
import { LegendGetter } from '../models/seriesType/config';

const legendGetter: LegendGetter<'bar'> = (params) => {
  const { seriesOrder, series } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, 'legend');

    if (formattedLabel === undefined) {
      return acc;
    }

    acc.push({
      color: series[seriesId].color,
      label: formattedLabel,
      id: seriesId,
    });
    return acc;
  }, [] as LegendItemParams[]);
};

export default legendGetter;
