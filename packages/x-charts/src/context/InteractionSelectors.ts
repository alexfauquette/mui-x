import { ChartsState } from '../internals/plugins/models';
import { createSelector } from '../internals/plugins/utils/selectors';

function selectInteraction(state: ChartsState) {
  return state.interaction;
}

export const selectorChartsInteractionItem = createSelector(
  selectInteraction,
  (interaction) => interaction.item,
);

export const selectorChartsInteractionAxis = createSelector(
  selectInteraction,
  (interaction) => interaction.axis,
);

export const selectorChartsInteractionXAxis = createSelector(
  selectInteraction,
  (interaction) => interaction.axis.x,
);

export const selectorChartsInteractionYAxis = createSelector(
  selectInteraction,
  (interaction) => interaction.axis.y,
);

export const selectorChartsInteractionItemIsDefined = createSelector(
  selectorChartsInteractionItem,
  (item) => item !== null,
);

export const selectorChartsInteractionXAxisIsDefined = createSelector(
  selectorChartsInteractionXAxis,
  (x) => x !== null,
);

export const selectorChartsInteractionYAxisIsDefined = createSelector(
  selectorChartsInteractionYAxis,
  (y) => y !== null,
);

export const selectorChartsInteractionUseVoronoid = createSelector(
  selectInteraction,
  (interaction) => interaction.useVoronoiInteraction,
);