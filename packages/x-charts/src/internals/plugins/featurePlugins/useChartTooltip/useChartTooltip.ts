import { warnOnce } from '@mui/x-internals/warning';
import { useAssertModelConsistency } from '@mui/x-internals/useAssertModelConsistency';
import useEventCallback from '@mui/utils/useEventCallback';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { fastObjectShallowCompare } from '@mui/x-internals/fastObjectShallowCompare';
import { ChartPlugin } from '../../models';
import { InteractionUpdateSource, UseChartTooltipSignature } from './useChartTooltip.types';
import { ChartItemIdentifier, ChartItemIdentifierWithData, ChartSeriesType } from '../../../../models/seriesType/config';

export const useChartTooltip: ChartPlugin<UseChartTooltipSignature> = ({ store, params }) => {
    useAssertModelConsistency({
        warningPrefix: 'MUI X Charts',
        componentName: 'Chart',
        propName: 'tooltipItem',
        controlled: params.tooltipItem,
        defaultValue: null,
    });

    useEnhancedEffect(() => {
        if (store.state.tooltip.item !== params.tooltipItem) {
            store.set('tooltip', { ...store.state.tooltip, item: params.tooltipItem ?? null });
        }
        if (process.env.NODE_ENV !== 'production') {
            if (params.tooltipItem !== undefined && !store.state.tooltip.isItemControlled) {
                warnOnce(
                    [
                        'MUI X Charts: The `tooltipItem` switched between controlled and uncontrolled state.',
                        'To remove the tooltip item when using controlled state, you must provide `null` to the `tooltipItem` prop instead of `undefined`.',
                    ].join('\n'),
                );
            }
        }
    }, [store, params.tooltipItem]);



    const removeTooltipItem = useEventCallback(function removeTooltipItem(
        itemToRemove?: ChartItemIdentifier<ChartSeriesType>,
    ) {
        const prevItem = store.state.tooltip.item;

        if (!itemToRemove) {
            // Remove without taking care of the current item
            if (prevItem !== null) {
                store.set('tooltip', { ...store.state.tooltip, item: null });
            }
            return;
        }

        if (
            prevItem === null ||
            Object.keys(itemToRemove).some(
                (key) =>
                    itemToRemove[key as keyof typeof itemToRemove] !== prevItem[key as keyof typeof prevItem],
            )
        ) {
            // The current item is already different from the one to remove. No need to clean it.
            return;
        }

        store.set('tooltip', { ...store.state.tooltip, item: null });
    });

    const setTooltipItem = useEventCallback(function setTooltipItem<T extends ChartSeriesType>(
        newItem: ChartItemIdentifierWithData<T>,
        context: { interaction: InteractionUpdateSource },
    ) {
        if (!fastObjectShallowCompare(store.state.tooltip.item, newItem)) {
            store.set('tooltip', {
                ...store.state.tooltip,
                lastUpdate: context.interaction,
                item: newItem,
            });
        }
    });


    return {
        instance: {
            removeTooltipItem,
            setTooltipItem,
        },
    };
};

useChartTooltip.getInitialState = (params) => ({
    tooltip: {
        item: params.tooltipItem ?? null,
        isItemControlled: params.tooltipItem !== undefined,
        lastUpdate: 'pointer',
    },
})

useChartTooltip.params = {
    tooltipItem: true,
    onTooltipItemChange: true,
};
