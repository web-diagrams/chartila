import { Page } from "@/redux/flow/interfaces/flowStateInterfaces";

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
