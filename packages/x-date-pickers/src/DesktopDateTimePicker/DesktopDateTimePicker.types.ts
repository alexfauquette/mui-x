import {
  UseDesktopPickerSlotsComponent,
  ExportedUseDesktopPickerSlotsComponentsProps,
  DesktopOnlyPickerProps,
} from '../internals/hooks/useDesktopPicker';
import {
  BaseDateTimePickerProps,
  BaseDateTimePickerSlotsComponent,
  BaseDateTimePickerSlotsComponentsProps,
} from '../DateTimePicker/shared';
import { MakeOptional } from '../internals/models/helpers';
import { DateOrTimeView } from '../models';
import { DesktopOnlyTimePickerProps } from '../internals/models/props/clock';
import { DateOrTimeViewWithMeridiem } from '../internals/models';
import {
  MultiSectionDigitalClockSlots,
  MultiSectionDigitalClockSlotProps,
} from '../MultiSectionDigitalClock';
import { DigitalClockSlots, DigitalClockSlotProps } from '../DigitalClock';

export interface DesktopDateTimePickerSlots<TDate>
  extends BaseDateTimePickerSlotsComponent<TDate>,
    MakeOptional<
      UseDesktopPickerSlotsComponent<TDate, DateOrTimeViewWithMeridiem>,
      'field' | 'openPickerIcon'
    >,
    DigitalClockSlots,
    MultiSectionDigitalClockSlots {}

export interface DesktopDateTimePickerSlotProps<TDate>
  extends BaseDateTimePickerSlotsComponentsProps<TDate>,
    ExportedUseDesktopPickerSlotsComponentsProps<TDate, DateOrTimeViewWithMeridiem>,
    DigitalClockSlotProps,
    MultiSectionDigitalClockSlotProps {}

export interface DesktopDateTimePickerProps<TDate>
  extends BaseDateTimePickerProps<TDate, DateOrTimeViewWithMeridiem>,
    DesktopOnlyPickerProps<TDate>,
    DesktopOnlyTimePickerProps<TDate> {
  /**
   * Available views.
   */
  views?: readonly DateOrTimeView[];
  /**
   * Years rendered per row.
   * @default 4
   */
  yearsPerRow?: 3 | 4;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: DesktopDateTimePickerSlots<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: DesktopDateTimePickerSlotProps<TDate>;
}
