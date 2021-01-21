import {MetaEntity} from "../../api/types";

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
  company?: any
) => {
  if (allowsNull) return null;

  if (fieldType === MetaFieldTypes.String) return '';
  if (fieldType === MetaFieldTypes.Integer) return 0;
  if (fieldType === MetaFieldTypes.Percentage) return 0;
  if (fieldType === MetaFieldTypes.Boolean) return false;
  if (fieldType === MetaFieldTypes.Array) return [];
}

// TODO: company? for future "edit" fuctionality
export const valuesInitter = <T extends {}>(meta: MetaEntity, initValues: T, company?: any): T => {
  meta.propertyMetadata.map((propDescription: any) => {
    const {
      propertyName,
      isEditable,
      fieldType,
      allowsNull,
    } = propDescription;

    Object.defineProperty(
      initValues,
      propertyName,
      {
        enumerable: true,
        configurable: isEditable,
        writable: false,
        value: metaFieldTypesSwitcher(fieldType, allowsNull),
      }
    );
  });
  return initValues;
}