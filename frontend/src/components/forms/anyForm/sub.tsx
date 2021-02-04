import React, {useState, useEffect} from 'react';
import {Form, Formik} from "formik";


const Sub = ({
  push,
  name,
  schema,
  initialState,
  renderFields,
  reactToChanges,
  ...props
}: any) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    reactToChanges(state);
  }, [state]);

  return (
    <Formik
      validateOnMount={true}
      enableReinitialize={true}
      initialValues={state}
      onSubmit={values => console.log(values)}
      validationSchema={schema}
    >
      <Form id={name}>
        {renderFields(setState, state)}
        <div>
          <button
            form={name}
            style={{ marginTop: '10px', marginLeft: '-20px' }}
            type="button"
            onClick={() => {
              schema.validate(state)
                .then((res: any) => push(res))
                .catch((e: any) => console.log(e, 'ERR'))
            }}
          >Add</button>
        </div>
      </Form>
    </Formik>
  )
}

export default Sub;
