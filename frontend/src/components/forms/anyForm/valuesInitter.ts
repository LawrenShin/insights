
export enum MetaFieldTypes {
  Array = 'Array',
  Boolean = 'Boolean',
  Percentage = 'Percentage',
  Integer = 'Integer',
  String = 'String',
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

    if (fieldType !== 'NestedEntity') {
      initValues = {...initValues, [key]: metaFieldTypesSwitcher(fieldType, allowsNull)};
    } else {
      initValues = {...initValues, ...valuesInitter(meta[key].meta, {})};
    }
  })
  return initValues;
}