import { GridInputComponentProps } from '../../_modules_/grid/GridComponentProps';

export const MAX_PAGE_SIZE = 100;

/**
 * The grid component react props interface.
 */
export type DataGridProps = Omit<
  GridInputComponentProps,
  | 'apiRef'
  | 'checkboxSelectionVisibleOnly'
  | 'disableColumnResize'
  | 'disableColumnReorder'
  | 'disableMultipleColumnsFiltering'
  | 'disableMultipleColumnsSorting'
  | 'disableMultipleSelection'
  | 'disableChildrenFiltering'
  | 'disableChildrenSorting'
  | 'disableColumnPinning'
  | 'disableRowGrouping'
  | 'throttleRowsMs'
  | 'hideFooterRowCount'
  | 'options'
  | 'onRowsScrollEnd'
  | 'scrollEndThreshold'
  | 'pinnedColumns'
  | 'onPinnedColumnsChange'
  | 'treeData'
  | 'getTreeDataPath'
  | 'groupingColDef'
  | 'defaultGroupingExpansionDepth'
  | 'isGroupExpandedByDefault'
  | 'rowGroupingColumnMode'
  | 'rowGroupingModel'
  | 'onRowGroupingModelChange'
  | 'signature'
  // TODO: Remove if we have an experimental feature concerning the DataGrid and override the property to only expose the experimental features of the DataGrid.
  | 'experimentalFeatures'
> & {
  pagination?: true;
};
