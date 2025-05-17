import { Language } from "../interfaces/docStateInterfaces";
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';

export enum NodeData {
  STRING_NODE = 'STRING_NODE',
  CODE_NODE = 'CODE_NODE',
}

export const languages: Record<Language, Function | undefined> = {
  'javascript': javascript,
  'java': java,
  'python': python,
}