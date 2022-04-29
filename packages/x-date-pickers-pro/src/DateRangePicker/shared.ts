import * as React from 'react';
import {
  buildDeprecatedPropsWarning,
  DateInputSlotsComponent,
  useDefaultDates,
  useLocaleText,
  useUtils,
  ValidationProps,
} from '@mui/x-date-pickers/internals';
import { useThemeProps } from '@mui/material/styles';
import {
  DateRangePickerViewSlotsComponent,
  ExportedDateRangePickerViewProps,
} from './DateRangePickerView';
import { DateRangeValidationError } from '../internal/hooks/validation/useDateRangeValidation';
import { DateRange, RangeInput } from '../internal/models';
import { ExportedDateRangePickerInputProps } from './DateRangePickerInput';

interface DateRangePickerSlotsComponent
  extends DateRangePickerViewSlotsComponent,
    DateInputSlotsComponent {}

export interface BaseDateRangePickerProps<TDate>
  extends ExportedDateRangePickerViewProps<TDate>,
    ValidationProps<DateRangeValidationError, RangeInput<TDate>>,
    ExportedDateRangePickerInputProps {
  /**
   * The components used for each slot.
   * Either a string to use an HTML element or a component.
   * @default {}
   */
  components?: Partial<DateRangePickerSlotsComponent>;
  /**
   * Text for end input label and toolbar placeholder.
   * @default 'End'
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
   */
  endText?: React.ReactNode;
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   * @default '__/__/____'
   */
  mask?: ExportedDateRangePickerInputProps['mask'];
  /**
   * Min selectable date. @DateIOType
   * @default defaultMinDate
   */
  minDate?: TDate;
  /**
   * Max selectable date. @DateIOType
   * @default defaultMaxDate
   */
  maxDate?: TDate;
  /**
   * Callback fired when the value (the selected date range) changes @DateIOType.
   * @template TDate
   * @param {DateRange<TDate>} date The new parsed date range.
   * @param {string} keyboardInputValue The current value of the keyboard input.
   */
  onChange: (date: DateRange<TDate>, keyboardInputValue?: string) => void;
  /**
   * Text for start input label and toolbar placeholder.
   * @default 'Start'
   * @deprecated Use the `localeText` prop of `LocalizationProvider` instead, see https://mui.com/x/react-date-pickers/localization
   */
  startText?: React.ReactNode;
  /**
   * The value of the date range picker.
   */
  value: RangeInput<TDate>;
}

export type DefaultizedProps<Props> = Props & { inputFormat: string };

const deprecatedPropsWarning = buildDeprecatedPropsWarning(
  'Props for translation are deprecated. See https://mui.com/x/react-date-pickers/localization for more information.',
);

export function useDateRangePickerDefaultizedProps<
  TDate,
  Props extends BaseDateRangePickerProps<TDate>,
>(
  props: Props,
  name: string,
): DefaultizedProps<Props> &
  Required<
    Pick<BaseDateRangePickerProps<unknown>, 'calendars' | 'mask' | 'startText' | 'endText'>
  > {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates();

  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const themeProps = useThemeProps({
    props,
    name,
  });

  deprecatedPropsWarning({
    startText: themeProps.startText,
    endText: themeProps.endText,
  });

  const localeText = useLocaleText();

  const startText = themeProps.startText ?? localeText.start;
  const endText = themeProps.endText ?? localeText.end;

  return {
    calendars: 2,
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate,
    minDate: defaultDates.minDate,
    maxDate: defaultDates.maxDate,
    ...themeProps,
    endText,
    startText,
  };
}
