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
  index?: number,
  externalKey?: string,
): JSX.Element => {
  if (key !== 'id') {
    const type = metaTypesMap.get(key)?.type;
    const displayName = metaTypesMap.get(key)?.displayName;
    const name = index !== undefined ? `${externalKey}.${key}.${index}` : key;

    let props: any = {
      name,
      className: classes ? (type === MetaFieldTypes.Boolean ? classes.checkbox : classes.input) : null,
      label: type !== MetaFieldTypes.Boolean ? displayName : undefined,
    };
    if (index !== undefined && tab === Tabs.ARRAYS) {
      if (externalKey) {
        const nameForValueField = type === MetaFieldTypes.Boolean ? 'checked' : 'value';
        props = {
          ...props,
          disabled: true,
          [nameForValueField]: values[externalKey][index][key],
        }
      }
    }

    if (type === MetaFieldTypes.Number) {
      return <Fields.Input
        {...props}
        type={'number'}
      />
    }

    if (type === MetaFieldTypes.Boolean) {
      return <Fields.Checkbox
        {...props}
        type={'checkbox'}
      >
        <label htmlFor={name} className={classes.checkBoxLabel}>{displayName}</label>
      </Fields.Checkbox>
    }

    if (type === MetaFieldTypes.String) {
      return <Fields.Input
        {...props}
        type={'text'}
      />
    }

    if (type === MetaFieldTypes.Percentage) {
      return <Fields.Input
        {...props}
        type={'number'}
        max={100}
        min={0}
      />
    }

    if (type === MetaFieldTypes.DropDown) {
      return <Fields.Select
        {...props}
      >
        {
          // @ts-ignore
          dicts[key]?.map(
            (option: Country | DictItem) => <option value={option.id}>{option.name}</option>
          )
        }
      </Fields.Select>
    }

    return <></>;
  }

  return <></>;
}
