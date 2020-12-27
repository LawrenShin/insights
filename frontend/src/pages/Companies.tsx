import React from 'react';
import ListComponent from '../components/list';
import companiesMock from '../mocks/companies';
import CompanyListItem from '../components/ListItems/CompanyItem';

export default function Companies () {

  return (
    <>
      {/*TODO: fix type data*/}
      <ListComponent
        data={companiesMock as any}
        elementGen={CompanyListItem}
        title={'List of companies'}
        keyVal={'Company'}
      />
    </>
  );
}
