import { ChartPluginSignature } from '../../models';
import { ChartItemIdentifier, ChartItemIdentifierWithData, ChartSeriesType } from '../../../../models/seriesType/config';


export interface UseChartTooltipParameters {
  /**
   * The controlled tooltip item.
   */
  tooltipItem?: ChartItemIdentifier<ChartSeriesType> | null;
  /**
   * The callback fired when the tooltip item changes.
   * @param {ChartItemIdentifier<ChartSeriesType> | null} item  The new tooltip item identifier.
   */
  onTooltipItemChange?: (item: ChartItemIdentifierWithData<ChartSeriesType> | null) => void;

}

export type InteractionUpdateSource = 'pointer' | 'keyboard';


export interface ChartsTooltipInstance {
  /**
   * Setter for the item the user is interacting with.
   * @param {ChartItemIdentifier} newItem The identifier of the item.
   * @param {{ interaction: InteractionUpdateSource }} context The context of the interaction.
   * @param {InteractionUpdateSource} context.interaction The source of the interaction update (pointer or keyboard).
   */
  setTooltipItem: (
    newItem: ChartItemIdentifierWithData<ChartSeriesType>,
    context: { interaction: InteractionUpdateSource },
  ) => void;
  /**
   * Remove item interaction if the current if the provided item is still the one interacting.
   * @param {ChartItemIdentifier} itemToRemove The identifier of the item.
   */
  removeTooltipItem: (itemToRemove?: ChartItemIdentifier<ChartSeriesType>) => void;
}

export interface UseChartTooltipState {
  tooltip: {
    /**
     * The controlled tooltip item.
     */
    item: ChartItemIdentifier<ChartSeriesType> | null;
    /**
     * Indicates whether the tooltip item is controlled.
     */
    isItemControlled: boolean;
    /**
     * The last interaction highlight update.
     * Used to decide if highlight should be based on pointer position or keyboard navigation.
     */
    lastUpdate: InteractionUpdateSource;
  };
}

export type UseChartTooltipSignature = ChartPluginSignature<{
  params: UseChartTooltipParameters;
  defaultizedParams: UseChartTooltipParameters;
  state: UseChartTooltipState;
  instance: ChartsTooltipInstance;
}>;
