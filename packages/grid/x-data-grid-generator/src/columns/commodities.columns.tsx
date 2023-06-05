import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {
  GRID_STRING_COL_DEF,
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid-premium';
import {
  randomCommodity,
  randomDesk,
  randomEmail,
  randomFeeRate,
  generateFilledQuantity,
  randomId,
  randomIncoterm,
  generateIsFilled,
  randomQuantity,
  randomTraderName,
  randomUnitPrice,
  randomUnitPriceCurrency,
  randomStatusOptions,
  randomPnL,
  randomTradeDate,
  randomMaturityDate,
  randomBrokerId,
  randomCompanyName,
  randomCountry,
  randomCurrency,
  randomAddress,
  randomCity,
  randomUpdatedDate,
  randomCreatedDate,
  randomRateType,
  randomContractType,
  randomTaxCode,
  randomCurencyRate,
} from '../services';
import {
  renderCountry,
  renderEmail,
  renderIncoterm,
  renderPnl,
  renderProgress,
  renderStatus,
  renderTotalPrice,
  renderEditCurrency,
  renderEditProgress,
  renderEditStatus,
  renderEditIncoterm,
} from '../renderer';
import {
  CONTRACT_TYPE_OPTIONS,
  COUNTRY_ISO_OPTIONS_SORTED,
  CountryIsoOption,
  CURRENCY_OPTIONS,
  INCOTERM_OPTIONS,
  RATE_TYPE_OPTIONS,
  STATUS_OPTIONS,
  TAXCODE_OPTIONS,
} from '../services/static-data';
import { GridColDefGenerator } from '../services/gridColDefGenerator';

interface SparklineProps {
  data: number[];
  width: number;
}

function Sparkline(props: SparklineProps) {
  const { data, width } = props;

  const xAxisData = React.useMemo(
    () => Array.from({ length: data.length }).map((_, index) => index),
    [data],
  );

  return (
    <LineChart
      margin={{ left: 6, right: 6, top: 4, bottom: 4 }}
      yAxis={[{ hidden: true }]}
      xAxis={[{ hidden: true, data: xAxisData }]}
      tooltip={{ trigger: 'none' }}
      series={[
        {
          data,
        },
      ]}
      width={width}
      height={40}
      sx={{
        '& .MuiMarkElement-root': {
          display: 'none',
        },
      }}
    />
  );
}

function GridSparklineCell(props: GridRenderCellParams<any, number[]>) {
  if (props.value == null) {
    return null;
  }

  return <Sparkline data={props.value} width={props.colDef.computedWidth} />;
}

const sparklineColumnType: GridColTypeDef<number[]> = {
  ...GRID_STRING_COL_DEF,
  resizable: false,
  filterable: false,
  sortable: false,
  editable: false,
  groupable: false,
  renderCell: (params: GridRenderCellParams) => <GridSparklineCell {...params} />,
};

export const getCommodityColumns = (editable = false): GridColDefGenerator[] => [
  {
    field: 'id',
    generateData: randomId,
    hide: true,
  },
  {
    field: 'desk',
    headerName: 'Desk',
    generateData: randomDesk,
    width: 110,
  },
  {
    field: 'commodity',
    headerName: 'Commodity',
    generateData: randomCommodity,
    width: 180,
    editable,
  },
  {
    field: 'traderName',
    headerName: 'Trader Name',
    generateData: randomTraderName,
    width: 120,
    editable,
  },
  {
    field: 'traderEmail',
    headerName: 'Trader Email',
    generateData: randomEmail,
    renderCell: renderEmail,
    width: 150,
    editable,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 140,
    generateData: randomQuantity,
    editable,
    valueParser: (value) => Number(value),
  },
  {
    field: 'filledQuantity',
    headerName: 'Filled Quantity',
    generateData: generateFilledQuantity,
    renderCell: renderProgress,
    renderEditCell: renderEditProgress,
    availableAggregationFunctions: ['min', 'max', 'avg', 'size'],
    type: 'number',
    width: 120,
    editable,
  },
  {
    field: 'isFilled',
    headerName: 'Is Filled',
    align: 'center',
    generateData: generateIsFilled,
    type: 'boolean',
    width: 80,
    editable,
  },
  {
    field: 'status',
    headerName: 'Status',
    generateData: randomStatusOptions,
    renderCell: renderStatus,
    renderEditCell: renderEditStatus,
    type: 'singleSelect',
    valueOptions: STATUS_OPTIONS,
    width: 150,
    editable,
  },
  {
    field: 'unitPrice',
    headerName: 'Unit Price',
    generateData: randomUnitPrice,
    type: 'number',
    editable,
    valueParser: (value) => Number(value),
  },
  {
    field: 'unitPriceCurrency',
    headerName: 'Unit Price Currency',
    generateData: randomUnitPriceCurrency,
    renderEditCell: renderEditCurrency,
    type: 'singleSelect',
    valueOptions: CURRENCY_OPTIONS,
    width: 120,
    editable,
  },
  {
    field: 'currencyExcahngeRate',
    headerName: 'Currency Exchange Rate',
    width: 150,
    generateData: randomCurencyRate,
    ...sparklineColumnType,
  },
  {
    field: 'subTotal',
    headerName: 'Sub Total',
    valueGetter: ({ row }) =>
      row.quantity == null || row.unitPrice == null ? null : row.quantity * row.unitPrice,
    type: 'number',
    width: 120,
  },
  {
    field: 'feeRate',
    headerName: 'Fee Rate',
    generateData: randomFeeRate,
    type: 'number',
    width: 80,
    editable,
    valueParser: (value) => Number(value),
  },
  {
    field: 'feeAmount',
    headerName: 'Fee Amount',
    valueGetter: ({ row }) =>
      row.feeRate == null || row.quantity == null || row.unitPrice == null
        ? null
        : row.feeRate * row.quantity * row.unitPrice,
    type: 'number',
    width: 120,
  },
  {
    field: 'incoTerm',
    generateData: randomIncoterm,
    renderCell: renderIncoterm,
    renderEditCell: renderEditIncoterm,
    type: 'singleSelect',
    valueOptions: INCOTERM_OPTIONS,
    editable,
  },
  {
    field: 'totalPrice',
    headerName: 'Total in USD',
    valueGetter: ({ row }) =>
      row.feeRate == null || row.quantity == null || row.unitPrice == null
        ? null
        : row.feeRate + row.quantity * row.unitPrice,
    renderCell: renderTotalPrice,
    type: 'number',
    width: 160,
  },
  {
    field: 'pnl',
    headerName: 'PnL',
    generateData: randomPnL,
    renderCell: renderPnl,
    type: 'number',
    width: 140,
  },
  {
    field: 'maturityDate',
    headerName: 'Maturity Date',
    generateData: randomMaturityDate,
    type: 'date',
    editable,
  },
  {
    field: 'tradeDate',
    headerName: 'Trade Date',
    generateData: randomTradeDate,
    type: 'date',
    editable,
  },
  {
    field: 'brokerId',
    headerName: 'Broker Id',
    generateData: randomBrokerId,
    hide: true,
    editable,
  },
  {
    field: 'brokerName',
    headerName: 'Broker Name',
    generateData: randomCompanyName,
    width: 140,
    editable,
  },
  {
    field: 'counterPartyName',
    headerName: 'Counterparty',
    generateData: randomCompanyName,
    width: 180,
    editable,
  },
  {
    field: 'counterPartyCountry',
    headerName: 'Counterparty Country',
    type: 'singleSelect',
    generateData: randomCountry,
    renderCell: renderCountry,
    valueOptions: COUNTRY_ISO_OPTIONS_SORTED,
    valueParser: (value) => {
      if (typeof value === 'string') {
        return COUNTRY_ISO_OPTIONS_SORTED.find((country) => country.value === value);
      }

      return value;
    },
    valueFormatter: ({ value }) => value?.label,
    groupingValueGetter: (params) => params.value.code,
    sortComparator: (v1, v2, param1, param2) =>
      gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
    editable,
    width: 120,
  } as GridColDef<any, CountryIsoOption, string>,
  {
    field: 'counterPartyCurrency',
    headerName: 'Counterparty Currency',
    generateData: randomCurrency,
    renderEditCell: renderEditCurrency,
    type: 'singleSelect',
    valueOptions: CURRENCY_OPTIONS,
    editable,
  },
  {
    field: 'counterPartyAddress',
    headerName: 'Counterparty Address',
    generateData: randomAddress,
    width: 200,
    editable,
  },
  {
    field: 'counterPartyCity',
    headerName: 'Counterparty City',
    generateData: randomCity,
    width: 120,
    editable,
  },
  {
    field: 'taxCode',
    headerName: 'Tax Code',
    generateData: randomTaxCode,
    type: 'singleSelect',
    valueOptions: TAXCODE_OPTIONS,
    editable,
  },
  {
    field: 'contractType',
    headerName: 'Contract Type',
    generateData: randomContractType,
    type: 'singleSelect',
    valueOptions: CONTRACT_TYPE_OPTIONS,
    editable,
  },
  {
    field: 'rateType',
    headerName: 'Rate Type',
    generateData: randomRateType,
    type: 'singleSelect',
    valueOptions: RATE_TYPE_OPTIONS,
    editable,
  },
  {
    field: 'lastUpdated',
    headerName: 'Updated on',
    generateData: randomUpdatedDate,
    type: 'dateTime',
    width: 180,
    editable,
  },
  {
    field: 'dateCreated',
    headerName: 'Created on',
    generateData: randomCreatedDate,
    type: 'date',
    width: 150,
    editable,
  },
];
