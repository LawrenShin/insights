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
  isoCode: string;
}
export interface Dictionaries {
  [key: string]: DictItem[] | Country[];
  addressType: DictItem[];
  country: Country[];
  educationLevel: DictItem[];
  gender: DictItem[];
  industry: DictItem[];
  industryCode: DictItem[];
  race: DictItem[];
  religion: DictItem[];
  roleType: DictItem[];
}

export interface Meta {
  [key: string]: any;
  company: any;
  person: any;
};