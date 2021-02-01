import {MetaFieldTypes} from "./valuesInitter";
import {typeRenaming} from "./schemaInitter";

export type MetaMapType = Map<string, { type: string; displayName: string }>;

export const metaFlatMap = (meta: any, metaMap: MetaMapType): MetaMapType => {
  Object.keys(meta).forEach((key, i) => {
    const {
      fieldType,
      displayName,
    } = meta[key];

    if (fieldType !== MetaFieldTypes.NestedEntity && fieldType.toLowerCase() !== MetaFieldTypes.Array) {
      metaMap.set(key, {
        type: typeRenaming(fieldType.toLowerCase(), true),
        displayName,
      });
    } else {
      metaFlatMap(meta[key].meta, metaMap);
    }
  });

  return metaMap;
}