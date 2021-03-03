import {ListRequestConfig} from "./listDuck";

export enum Roles {
  EXECUTIVES = 1,
  BOARD,
  BOTH,
}

export enum Tabs {
  EXECUTIVES,
  BOARDS,
  CONTENT,
}

export const ExcludedFields = {
  isoCode: 'isoCode',
  isEditable: 'isEditable',
  people: 'people',
  roles: 'roles',
}

export interface StateProps {
  accessRights: string[] | [];
  dicts: any;
  meta: any;
}
export interface DispatchProps {
  loadList: (config: ListRequestConfig) => void;
  loadDicts: () => void;
  loadMeta: () => void;
  deletePerson: (config: ListRequestConfig) => void;
}
export interface Props extends DispatchProps, StateProps{
  data: any;
  title: string;
  setSelectedPerson: (person: any) => void;
  callPersonForm: () => JSX.Element;
  callCompanyForm: () => JSX.Element;
}
