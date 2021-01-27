import * as Yup from 'yup';
import {MetaFieldTypes} from "./valuesInitter";

export const typeRenaming = (type: string): string => {
  if (type === MetaFieldTypes.Percentage || type === MetaFieldTypes.Float) return 'string';
  if (type === MetaFieldTypes.Integer) return 'number';
  return type;
}
// TODO: may be needed if it gets more complicated
// const YupFieldConstructor = (type: string, required: boolean) => {
//   if (type === 'string') {
//     if (required) return Yup.string().required();
//   }
//   return Yup.string();
// }


// TODO:NOTES:
// Array fields goes in separate forms. So here they be treated like NOT required, provided empty arrays.
// NestedEntity means there's subset of fields that should be rendered in this form.
// id key doesn't participate in form.
//
export const schemaInitter = (
  meta: any,
  initSchema: {[key: string]: any},
  existingSchema?: any
): {[key: string]: any} => {

  Object.keys(meta).forEach((key, i) => {
    const {
      fieldType,
      allowsNull,
    } = meta[key];
    if (key !== 'id') {
      if (fieldType !== MetaFieldTypes.NestedEntity) {
        const fieldTypeRenamed = typeRenaming(fieldType.toLowerCase());
        initSchema = {
          ...initSchema,
          [key]: (allowsNull || fieldTypeRenamed === MetaFieldTypes.Array) ?
            // TODO: replace this workaround with ts solution.
            // @ts-ignore
            Yup[fieldTypeRenamed]().nullable() : Yup[fieldTypeRenamed]().required(),
        };
      } else {
        initSchema = {
          ...initSchema,
          ...schemaInitter(meta[key].meta, {}),
        };
      }
    }
  })

  return initSchema;
};