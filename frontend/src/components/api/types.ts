export enum RequestStatus {
  STILL,
  LOADING,
  FAIL
}

export interface DictItem {
  id: number;
  name: string;
}
export interface Country extends DictItem{
  iso: string;
}
export interface Dictionaries {
  countries: Country[];
  educationLevels: DictItem[];
  genders: DictItem[];
  industries: DictItem[];
  industryCodes: DictItem[];
  maritalStatuses: DictItem[];
  races: DictItem[];
  regions: DictItem[];
  religions: DictItem[];
  roleTypes: DictItem[];
}

export interface Meta {

}