// getCurrentPage.ts
import { createSelector } from '@reduxjs/toolkit';
import { getFlow } from './getFlow';
import { FlowState } from '../interfaces/flowStateInterfaces';

export const getLastIndexOfQuestions = createSelector(getFlow, (flow: FlowState) => {
    const { pages, currentPageId } = flow;
    if (pages?.length && currentPageId) {
        return flow.pages.find((page) => page.id === flow.currentPageId);
    }
    return null;
});
