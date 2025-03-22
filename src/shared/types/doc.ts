import { Page } from "@/redux/doc/interfaces/docStateInterfaces";

export interface DocInfoDto {
  id: string;
  name: string;
  editDate: string;
  mode: 'READONLY' | 'PRIVATE';
}

export interface DocDto {
  name: string;
  pages: Page[]
}
