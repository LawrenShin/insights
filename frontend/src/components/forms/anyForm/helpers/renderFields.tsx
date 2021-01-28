import {MetaMapType} from "./metaFlatMap";
import {Dictionaries} from "../../../api/types";
import {MetaFieldTypes} from "./valuesInitter";
import * as Fields from "../../../fields";
import React from "react";


// TODO: create fields on fly
// number | string - input
// boolean - checkbox
// dropdown select, but also needs dictionary for this

export const renderField = (
  key: string,
  val: any,
  metaTypesMap: MetaMapType,
  dicts: Dictionaries,
  classes?: any
): JSX.Element => {
  if (key !== 'id') {
    if (metaTypesMap.get(key)?.type === MetaFieldTypes.Number) {
      return <Fields.Input
        className={classes ? classes.input : null}
        label={metaTypesMap.get(key)?.displayName}
        name={key}
        type={'number'}
      />
    }

    if (metaTypesMap.get(key)?.type === MetaFieldTypes.Boolean) {
      return <Fields.Checkbox
        className={classes ? classes.checkbox : null}
        name={key}
        type={'checkbox'}
      >
        <label htmlFor={key} className={classes.checkBoxLabel}>{metaTypesMap.get(key)?.displayName}</label>
      </Fields.Checkbox>
    }

    if (metaTypesMap.get(key)?.type === MetaFieldTypes.String) {
      return <Fields.Input
        className={classes ? classes.input : null}
        label={metaTypesMap.get(key)?.displayName}
        name={key}
        type={'text'}
      />
    }

    if (metaTypesMap.get(key)?.type === MetaFieldTypes.Percentage) {
      return <Fields.Input
        className={classes ? classes.input : null}
        label={metaTypesMap.get(key)?.displayName}
        name={key}
        type={'number'}
        max={100}
        min={0}
      />
    }

    // if (metaTypesMap.get(key)?.type === MetaFieldTypes.Array) {
    //   return <Fields.Select
    //     className={classes.input}
    //     label={metaTypesMap.get(key)?.displayName}
    //     name={key}
    //   >
    //     {
    //       // @ts-ignore
    //       dicts[key]?.map((option: Country | DictItem) => <option value={option.id}>{option.name}</option>)
    //     }
    //   </Fields.Select>
    // }

    return <></>;
  }

  return <></>;
}
