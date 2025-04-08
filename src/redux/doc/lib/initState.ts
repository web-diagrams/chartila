import { cloneDeep } from "lodash";
import { DocState, Page } from "../interfaces/docStateInterfaces";

export const initState = (state: DocState, pageId: string, docName?: string, pages?: Page[]) => {
  const currentState = state.currentState;
  currentState.pages = pages ?? [
    {
      id: pageId,
      nodes: [],
      edges: [],
      pageName: 'New page',
    },
  ];
  currentState.currentPageId = pageId;
  state.history[0] = cloneDeep(state.currentState);
  state.isInited = true;
  if (docName) {
    state.currentState.docName = docName;
  }
};
