import {MetaFieldTypes} from "./valuesInitter";
import {typeRenaming} from "./schemaInitter";

export type MetaMapType = Map<string, { type: string; displayName: string }>;

export const metaFlatMap = (meta: any, metaMap: MetaMapType): MetaMapType => {
  Object.keys(meta).forEach((key, i) => {
    const {
      fieldType,
      displayName,
    } = meta[key];

    if (fieldType !== MetaFieldTypes.NestedEntity) {
      metaMap.set(key, {
        type: typeRenaming(fieldType.toLowerCase()),
        displayName,
      });
    } else {
      metaFlatMap(meta[key].meta, metaMap);
    }
  });

  return metaMap;
}