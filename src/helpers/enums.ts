/**
 * From an enum value, get the key/name
 * Source: https://stackoverflow.com/a/68533063/2710385
 * @param myEnum The enum to search
 * @param enumValue The value to get the key for
 * @returns The key
 */
export function getEnumKeyByEnumValue<
  TEnumKey extends string,
  TEnumVal extends string | number
>(myEnum: { [key in TEnumKey]: TEnumVal }, enumValue: TEnumVal): string {
  const keys = (Object.keys(myEnum) as TEnumKey[]).filter(
    (x) => myEnum[x] === enumValue,
  );
  return keys.length > 0 ? keys[0] : '';
}
