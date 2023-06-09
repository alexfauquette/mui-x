import { plPL as plPLCore } from '@mui/material/locale';
import { GridLocaleText } from '../models/api/gridLocaleTextApi';
import { getGridLocalization, Localization } from '../utils/getGridLocalization';

const plPLGrid: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: 'Brak danych',
  noResultsOverlayLabel: 'Nie znaleziono wyników.',

  // Density selector toolbar button text
  toolbarDensity: 'Wysokość rzędu',
  toolbarDensityLabel: 'Wysokość rzędu',
  toolbarDensityCompact: 'Kompakt',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Komfort',

  // Columns selector toolbar button text
  toolbarColumns: 'Kolumny',
  toolbarColumnsLabel: 'Zaznacz kolumny',

  // Filters toolbar button text
  toolbarFilters: 'Filtry',
  toolbarFiltersLabel: 'Pokaż filtry',
  toolbarFiltersTooltipHide: 'Ukryj filtry',
  toolbarFiltersTooltipShow: 'Pokaż filtry',
  toolbarFiltersTooltipActive: (count) => `Liczba aktywnych filtrów: ${count}`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Wyszukaj…',
  toolbarQuickFilterLabel: 'Szukaj',
  toolbarQuickFilterDeleteIconLabel: 'Wyczyść',

  // Export selector toolbar button text
  toolbarExport: 'Eksportuj',
  toolbarExportLabel: 'Eksportuj',
  toolbarExportCSV: 'Pobierz jako plik CSV',
  toolbarExportPrint: 'Drukuj',
  toolbarExportExcel: 'Pobierz jako plik Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Znajdź kolumnę',
  columnsPanelTextFieldPlaceholder: 'Tytuł kolumny',
  columnsPanelDragIconLabel: 'Zmień kolejność kolumn',
  columnsPanelShowAllButton: 'Pokaż wszystko',
  columnsPanelHideAllButton: 'Ukryj wszystko',

  // Filter panel text
  filterPanelAddFilter: 'Dodaj filtr',
  // filterPanelRemoveAll: 'Remove all',
  filterPanelDeleteIconLabel: 'Usuń',
  filterPanelLogicOperator: 'Operator logiczny',
  filterPanelOperator: 'Operator',
  filterPanelOperatorAnd: 'I',
  filterPanelOperatorOr: 'Lub',
  filterPanelColumns: 'Kolumny',
  filterPanelInputLabel: 'Wartość',
  filterPanelInputPlaceholder: 'Filtrowana wartość',

  // Filter operators text
  filterOperatorContains: 'zawiera',
  filterOperatorEquals: 'równa się',
  filterOperatorStartsWith: 'zaczyna się od',
  filterOperatorEndsWith: 'kończy się na',
  filterOperatorIs: 'równa się',
  filterOperatorNot: 'różne',
  filterOperatorAfter: 'większe niż',
  filterOperatorOnOrAfter: 'większe lub równe',
  filterOperatorBefore: 'mniejsze niż',
  filterOperatorOnOrBefore: 'mniejsze lub równe',
  filterOperatorIsEmpty: 'jest pusty',
  filterOperatorIsNotEmpty: 'nie jest pusty',
  filterOperatorIsAnyOf: 'jest jednym z',
  // 'filterOperator=': '=',
  // 'filterOperator!=': '!=',
  // 'filterOperator>': '>',
  // 'filterOperator>=': '>=',
  // 'filterOperator<': '<',
  // 'filterOperator<=': '<=',

  // Header filter operators text
  // headerFilterOperatorContains: 'Contains',
  // headerFilterOperatorEquals: 'Equals',
  // headerFilterOperatorStartsWith: 'Starts with',
  // headerFilterOperatorEndsWith: 'Ends with',
  // headerFilterOperatorIs: 'Is',
  // headerFilterOperatorNot: 'Is not',
  // headerFilterOperatorAfter: 'Is after',
  // headerFilterOperatorOnOrAfter: 'Is on or after',
  // headerFilterOperatorBefore: 'Is before',
  // headerFilterOperatorOnOrBefore: 'Is on or before',
  // headerFilterOperatorIsEmpty: 'Is empty',
  // headerFilterOperatorIsNotEmpty: 'Is not empty',
  // headerFilterOperatorIsAnyOf: 'Is any of',
  // 'headerFilterOperator=': 'Equals',
  // 'headerFilterOperator!=': 'Not equals',
  // 'headerFilterOperator>': 'Greater than',
  // 'headerFilterOperator>=': 'Greater than or equal to',
  // 'headerFilterOperator<': 'Less than',
  // 'headerFilterOperator<=': 'Less than or equal to',

  // Filter values text
  filterValueAny: 'dowolny',
  filterValueTrue: 'prawda',
  filterValueFalse: 'fałsz',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Pokaż wszystkie kolumny',
  // columnMenuManageColumns: 'Manage columns',
  columnMenuFilter: 'Filtr',
  columnMenuHideColumn: 'Ukryj',
  columnMenuUnsort: 'Anuluj sortowanie',
  columnMenuSortAsc: 'Sortuj rosnąco',
  columnMenuSortDesc: 'Sortuj malejąco',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `Liczba aktywnych filtrów: ${count}`,
  columnHeaderFiltersLabel: 'Pokaż filtry',
  columnHeaderSortIconLabel: 'Sortuj',

  // Rows selected footer text
  footerRowSelected: (count) => `Liczba wybranych wierszy: ${count.toLocaleString()}`,

  // Total row amount footer text
  footerTotalRows: 'Łączna liczba wierszy:',

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} z ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Pole wyboru',
  checkboxSelectionSelectAllRows: 'Zaznacz wszystkie wiersze',
  checkboxSelectionUnselectAllRows: 'Odznacz wszystkie wiersze',
  checkboxSelectionSelectRow: 'Zaznacz wiersz',
  checkboxSelectionUnselectRow: 'Odznacz wiersz',

  // Boolean cell text
  booleanCellTrueLabel: 'tak',
  booleanCellFalseLabel: 'nie',

  // Actions cell more text
  actionsCellMore: 'więcej',

  // Column pinning text
  pinToLeft: 'Przypnij do lewej',
  pinToRight: 'Przypnij do prawej',
  unpin: 'Odepnij',

  // Tree Data
  treeDataGroupingHeaderName: 'Grupa',
  treeDataExpand: 'pokaż elementy potomne',
  treeDataCollapse: 'ukryj elementy potomne',

  // Grouping columns
  groupingColumnHeaderName: 'Grupa',
  groupColumn: (name) => `Grupuj według ${name}`,
  unGroupColumn: (name) => `Rozgrupuj ${name}`,

  // Master/detail
  // detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Rozwiń',
  collapseDetailPanel: 'Zwiń',

  // Row reordering text
  rowReorderingHeaderName: 'Porządkowanie wierszy',

  // Aggregation
  // aggregationMenuItemHeader: 'Aggregation',
  // aggregationFunctionLabelSum: 'sum',
  // aggregationFunctionLabelAvg: 'avg',
  // aggregationFunctionLabelMin: 'min',
  // aggregationFunctionLabelMax: 'max',
  // aggregationFunctionLabelSize: 'size',
};

export const plPL: Localization = getGridLocalization(plPLGrid, plPLCore);
