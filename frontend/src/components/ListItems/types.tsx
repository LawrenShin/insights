import React from "react";

export interface CompanyType {
  [key: string]: string;
}

export interface CompanyHandlers {
  select: (id: string | number) => void;
  delete: (id: string | number) => void;
}

export type CompanyListItemGenType = (Company: CompanyType, handlers: CompanyHandlers) => JSX.Element;

export type ListItemType = CompanyType;
export type ListItemTypeGen = CompanyListItemGenType;