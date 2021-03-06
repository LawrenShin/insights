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
  customOnChange?: (values: any) => void,
): JSX.Element => {
  if (key !== 'isEditable' && !key.match(/^[\w+]+Id$|^id$/gi) && key !== 'isoCode') {
    const type = metaTypesMap.get(key)?.type;
    const displayName = metaTypesMap.get(key)?.displayName;
    const name = (index !== undefined) ? `${externalKey}.${key}.${index}` : key;
    const nameForValueField = type === MetaFieldTypes.Boolean ? 'checked' : 'value';

    let props: any = {
      name,
      className: classes ? (type === MetaFieldTypes.Boolean ? classes.checkbox : classes.input) : null,
      label: type !== MetaFieldTypes.Boolean ? displayName : undefined,
      [nameForValueField]: values[key] === undefined ? null : values[key],
    };
    if (key === MetaFieldTypes.Array) {
      // existing values of arrays render
      if (index !== undefined) {
        if (externalKey) {
          props = {
            ...props,
            disabled: true,
            [nameForValueField]: values[externalKey][index][key],
          }
        }
      }
      // empty form behaviour
      if (index === undefined && customOnChange) {
        props = {
          ...props,
          onChange: (e: any) => {
            return customOnChange({
              [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            })
          },
        }
      }
    }

    if (type === MetaFieldTypes.Number) {
      return <Fields.Input {...props} type={'number'} />
    }

    if (type === MetaFieldTypes.Boolean) {
      return <Fields.Checkbox {...props} type={'checkbox'}>
        <label htmlFor={name} className={classes.checkBoxLabel}>{displayName}</label>
      </Fields.Checkbox>
    }

    if (type === MetaFieldTypes.String) {
      return <Fields.Input {...props} type={'text'} />
    }

    if (type === MetaFieldTypes.Percentage) {
      return <Fields.Input
        {...props}
        type={'text'}
        max={100}
        min={0}
      />
    }

    if (type === MetaFieldTypes.DropDown) {
      return <Fields.Select {...props}>
        {
          // TODO: refactor
          // @ts-ignore
          dicts[key === 'highEducation' ? 'educationLevel' : key]?.map(
            (option: Country | DictItem) => <option value={option.id}>{option.name}</option>
          )
        }
      </Fields.Select>
    }

    return <></>;
  }

  return <></>;
}