import React from "react";

export interface CompanyType {
  Company: string,
  Ticker: string,
  Index: string,
  WSJ: string,
  HQ: string,
  Region: string,
  Employees: string,
  ExecutiveWebsite: string,
  BoardWebsite: string,
  Role: string,
  Title: string,
  Name: string,
  Age: string,
  BirthYear: string,
  Gender: string,
  Race: string,
  Primary: string,
  Secondary: string,
  HighEdu: string,
  EduSubject: string,
  EduInstitut: string,
  Religion: string,
  Sexuality: string,
  Married: string,
}

export type CompanyListItemGenType = (Company: CompanyType) => JSX.Element;

export type ListItemType = CompanyType;
export type ListItemTypeGen = CompanyListItemGenType;