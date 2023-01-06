// TODO v7: This file exist only to simplify typing between
// components/componentsProps and slots/slotsProps
// Should be deleted when components/componentsProps are removed

type UncapitalizeKeys<T extends object> = Uncapitalize<keyof T & string>;

export type UncapitalizeObjectKeys<T extends object> = {
  [key in UncapitalizeKeys<T>]: Capitalize<key> extends keyof T ? T[Capitalize<key>] : never;
};

export interface SlotsAndSlotsProps<TSlotsLegacy, TSlots, TSlotsProps> {
  /**
   * Overrideable components.
   * @default {}
   * @deprecated
   */
  components?: Partial<TSlotsLegacy>;
  /**
   * The props used for each component slot.
   * @default {}
   * @deprecated
   */
  componentsProps?: TSlotsProps;
  /**
   * Overrideable components.
   * @default {}
   */
  slots?: TSlots;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotsProps?: TSlotsProps;
}

type RetrunedType<TInputType> = TInputType extends object
  ? UncapitalizeObjectKeys<TInputType>
  : undefined;

export const uncapitalizeObjectKeys = <TInputType extends object>(
  capitalizedObject: TInputType | undefined,
): RetrunedType<typeof capitalizedObject> => {
  if (capitalizedObject === undefined) {
    return undefined as RetrunedType<undefined>;
  }

  const entries = Object.entries(capitalizedObject);
  const mappedEntries = entries.map(([k, v]) => [`${k.slice(0, 1).toLowerCase()}${k.slice(1)}`, v]);

  return Object.fromEntries(mappedEntries) as RetrunedType<TInputType>;
};
