import useEventCallback from '@mui/utils/useEventCallback';
import { ChartPlugin } from '../../models';
import {
  Coordinate,
  UseChartInteractionSignature,
} from './useChartInteraction.types';

export const useChartInteraction: ChartPlugin<UseChartInteractionSignature> = ({ store }) => {
  const cleanInteraction = useEventCallback(function cleanInteraction() {
    store.set('interaction', { ...store.state.interaction, pointer: null, item: null });
  });


  const setPointerCoordinate = useEventCallback(function setPointerCoordinate(
    coordinate: Coordinate | null,
  ) {
    store.set('interaction', {
      ...store.state.interaction,
      pointer: coordinate,
      lastUpdate: coordinate !== null ? 'pointer' : store.state.interaction.lastUpdate,
    });
  });

  return {
    instance: {
      cleanInteraction,
      setPointerCoordinate,
    },
  };
};

useChartInteraction.getInitialState = () => ({
  interaction: { item: null, pointer: null, lastUpdate: 'pointer' },
});

useChartInteraction.params = {};
