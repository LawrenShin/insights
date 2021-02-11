// TODO: check all comparisons with enum and bring all of it's values to lower case
export enum MetaFieldTypes {
  Array = 'array',
  Boolean = 'boolean',
  Percentage = 'percentage',
  Integer = 'integer',
  Number = 'number',
  String = 'string',
  Float = 'float',
  NestedEntity = 'NestedEntity',
  DropDown = 'dropdown',
}

// TODO: company? for future "edit" fuctionality
const metaFieldTypesSwitcher = (
  fieldType: MetaFieldTypes,
  allowsNull: boolean | undefined,
  existingValues?: any
) => {
  if (allowsNull) return null;

  if (fieldType === MetaFieldTypes.String) return '';
  if (fieldType === MetaFieldTypes.Integer) return 0;
  if (fieldType === MetaFieldTypes.Percentage) return 0;
  if (fieldType === MetaFieldTypes.Boolean) return false;
  if (fieldType === MetaFieldTypes.Array) return [];
}

// TODO: company? for future "edit" fuctionality
// meta - metadata of an entity
// initValues - empty object
// existing values - vals of a company on edit mode
export const valuesInitter = <T extends {}>(meta: any, initValues: T, existingValues?: any): T => {
  Object.keys(meta).forEach((key, index) => {
    const {
      fieldType,
      allowsNull,
    } = meta[key];
    const inExistingValid = existingValues && existingValues[key];

    if (fieldType !== MetaFieldTypes.NestedEntity) {
      initValues = {...initValues, [key]: inExistingValid ?
          existingValues[key] : metaFieldTypesSwitcher(fieldType.toLowerCase(), allowsNull)};
    } else {
      initValues = {
        ...initValues,
        ...valuesInitter(meta[key].meta, {}, inExistingValid ? existingValues[key] : null)};
    }
  })
  return initValues;
}