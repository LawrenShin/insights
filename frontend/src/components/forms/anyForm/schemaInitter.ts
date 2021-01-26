import * as Yup from 'yup';


const typeRenaming = (type: string): string => {
  if (type === 'percentage' || type === 'float') return 'string';
  if (type === 'integer') return 'number';
  return type;
}
// TODO: may be needed if it gets more complicated
// const YupFieldConstructor = (type: string, required: boolean) => {
//   if (type === 'string') {
//     if (required) return Yup.string().required();
//   }
//   return Yup.string();
// }

export const schemaInitter = <T extends {}>(meta: any, initSchema: T, existingSchema?: any): T => {
  Object.keys(meta).forEach((key, i) => {
    const {
      fieldType,
      allowsNull,
    } = meta[key];

    if (fieldType !== 'NestedEntity') {
      const fieldTypeRenamed = typeRenaming(fieldType.toLowerCase());
      initSchema = {
        ...initSchema,
        // TODO: replace this workaround with ts solution.
        // @ts-ignore
        [key]: allowsNull ? Yup[fieldTypeRenamed]() : Yup[fieldTypeRenamed]().required(),
      };
    } else {
        initSchema = {
          ...initSchema,
          ...schemaInitter(meta[key].meta, {})
        };
    }
  })

  return initSchema;
};