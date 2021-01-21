import React from 'react';
import {MetaEntity} from "../../api/types";


interface Props<I> {
  entity: MetaEntity;
  initialValues: I;
}

// TODO: should consist of 3 functions. 1 brings inits, 2 Validation schema, 3d form itself. This will be the bag for all
const AnyForm = <I extends {}>({
    initialValues
  }: Props<I>) => {

  return (
    <>

    </>
  );
}

export default AnyForm;
