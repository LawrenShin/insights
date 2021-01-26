import {MetaFieldTypes} from "./valuesInitter";
import {typeRenaming} from "./schemaInitter";


export const metaFlatMap = (meta: any, metaMap: Map<string, string>): Map<string, string> => {
  Object.keys(meta).forEach((key, i) => {
    const {
      fieldType,
    } = meta[key];

    if (fieldType !== MetaFieldTypes.NestedEntity) {
      metaMap.set(key, typeRenaming(fieldType.toLowerCase()));
    } else {
      metaFlatMap(meta[key].meta, metaMap);
    }
  });

  return metaMap;
}