import React from 'react';
import {
  useField,
  FieldConfig,
  FieldArray,
  FieldArrayConfig,
} from "formik";

interface InputProps extends FieldConfig {
  label?: string;
  id?: string;
  className?: string;
  max?: string | number;
  min?: string | number;
}

interface InputArrayFieldProps extends FieldArrayConfig {
  label: string;
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

export const Select: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
        <option value={undefined}>Empty</option>
        {props.children}
      </select>
      {meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const Array: React.FC<InputArrayFieldProps> = ({ label, ...props }) => {
  return (
    <FieldArray {...props}>
      {({ insert, remove, push }) => (
        <>

        </>
      )}
    </FieldArray>
  )
}