import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  useField,
  FieldConfig,
} from "formik";
import {TextField} from "@material-ui/core";
import {Dispatch} from "redux";
import {CreateAction} from "../../store/action";
import {ListActionTypes} from "../listDuck";

interface InputProps extends FieldConfig {
  label?: string;
  id?: string;
  className?: string;
  max?: string | number;
  min?: string | number;
  disabled?: boolean;
}

const preventSymbols = (evt: React.KeyboardEvent) => {
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
  {
    evt.preventDefault();
  }
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        onKeyDown={(evt) => {
          if (props.type === 'number') preventSymbols(evt);
        }}
        className={props.className}
      />
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const Checkbox: React.FC<InputProps> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <div className={props.className}>
        <input type="checkbox" {...field} {...props} />
        {children}
      </div>
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const Select: React.FC<InputProps & {onChange?: (e: any) => void}> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
        <option value={undefined}></option>
        {props.children}
      </select>
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};


interface SearchDispatchProps {
  fetchItem: (name: string, value: string | number) => void,
  clearSearch: (name: string) => void,
}
interface SearchOwnProps {
  pagination: string;
  pullSearchValue?: (search: string) => void;
}
export const Search: React.FC<InputProps & SearchDispatchProps & SearchOwnProps> = (
  {
    name,
    label,
    className,
    fetchItem,
    clearSearch,
    pullSearchValue,
    ...props
  }
) => {
  const [value, setValue]= useState<any>(null);
  const [search, setSearch] = useState<string>('');

  const timeout: TimerHandler = (value: string | number) => {
    if (value) {
      return fetchItem(name, value);
    }
    setValue(null);
    return clearSearch(name);
  }

  useEffect(() => {
    if (pullSearchValue) pullSearchValue(search);
  }, [search]);

  return <TextField
    id={`search`}
    label="Search"
    className={className}
    onChange={(e) => {
      if (value) {
        clearTimeout(value);
        setValue(null);
      }
      setValue(setTimeout(timeout, 1000, e.target.value));
      setSearch(e.target.value);
    }}
  />
}

export const ConnectedSearch = connect(
  undefined,
  (dispatch: Dispatch, {pagination}: SearchOwnProps) => ({
    fetchItem: (name: string, value: string | number) => dispatch(
      CreateAction(ListActionTypes.LIST_SEARCH, {
        url: name,
        params: `search_prefix=${value}&${pagination}`
      })
    ),
    clearSearch: (name: string) => dispatch(
      CreateAction(ListActionTypes.LIST_SEARCH_CLEAR, {url: name, params: pagination})
    ),
  })
)(Search);
