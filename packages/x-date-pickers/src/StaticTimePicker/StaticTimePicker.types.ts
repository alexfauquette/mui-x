import {
  BaseTimePickerProps,
  BaseTimePickerSlotsComponent,
  BaseTimePickerSlotsComponentsProps,
} from '../TimePicker/shared';
import {
  StaticOnlyPickerProps,
  UseStaticPickerSlotsComponent,
  UseStaticPickerSlotsComponentsProps,
} from '../internals/hooks/useStaticPicker';
import { MakeOptional } from '../internals';
import { TimeView } from '../models';

export interface StaticTimePickerSlots<TDate>
  extends BaseTimePickerSlotsComponent<TDate>,
    UseStaticPickerSlotsComponent<TDate, TimeView> {}

export interface StaticTimePickerSlotProps<TDate>
  extends BaseTimePickerSlotsComponentsProps,
    UseStaticPickerSlotsComponentsProps<TDate, TimeView> {}

export interface StaticTimePickerProps<TDate>
  extends BaseTimePickerProps<TDate, TimeView>,
    MakeOptional<StaticOnlyPickerProps, 'displayStaticWrapperAs'> {
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: StaticTimePickerSlots<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: StaticTimePickerSlotProps<TDate>;
}
