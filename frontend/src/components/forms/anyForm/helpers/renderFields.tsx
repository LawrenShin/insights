import {MetaMapType} from "./metaFlatMap";
import {Country, Dictionaries, DictItem} from "../../../api/types";
import {MetaFieldTypes} from "./valuesInitter";
import * as Fields from "../../../fields";
import React from "react";
import {FormikValues} from "formik";
import {Tabs} from "../index";


// TODO: create fields on fly
// number | string - input
// boolean - checkbox
// dropdown select, but also needs dictionary for this

export const renderField = (
  key: string,
  val: any,
  metaTypesMap: MetaMapType,
  dicts: Dictionaries,
  values: FormikValues,
  tab: Tabs,
  classes?: any,
  meta?: any,
): JSX.Element => {
  if (key !== 'id') {
    const type = metaTypesMap.get(key)?.type;
    const displayName = metaTypesMap.get(key)?.displayName;

    // if (type === MetaFieldTypes.Array && tab === Tabs.ARRAYS) {
    //   // console.log(values[key], key, meta, 'ARRA')
    // }

    // if (tab === Tabs.FIELDS) {
      if (type === MetaFieldTypes.Number) {
        return <Fields.Input
          className={classes ? classes.input : null}
          label={displayName}
          name={key}
          type={'number'}
        />
      }

      if (type === MetaFieldTypes.Boolean) {
        return <Fields.Checkbox
          className={classes ? classes.checkbox : null}
          name={key}
          type={'checkbox'}
        >
          <label htmlFor={key} className={classes.checkBoxLabel}>{displayName}</label>
        </Fields.Checkbox>
      }

      if (type === MetaFieldTypes.String) {
        return <Fields.Input
          className={classes ? classes.input : null}
          label={displayName}
          name={key}
          type={'text'}
        />
      }

      if (type === MetaFieldTypes.Percentage) {
        return <Fields.Input
          className={classes ? classes.input : null}
          label={displayName}
          name={key}
          type={'number'}
          max={100}
          min={0}
        />
      }

      if (type === MetaFieldTypes.DropDown) {
        return <Fields.Select
          className={classes.input}
          label={displayName}
          name={key}
        >
          {
            // @ts-ignore
            dicts[key]?.map(
              (option: Country | DictItem) => <option value={option.id}>{option.name}</option>
            )
          }
        </Fields.Select>
      }
    // }

    return <></>;
  }

  return <></>;
}
