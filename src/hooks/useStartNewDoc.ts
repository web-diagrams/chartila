import { useCreateDocMutation } from "@/app/api/docsApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useServer } from "@/app/providers/ServerProvider/ServerProvider";
import { docActions } from "@/redux/doc/slice/docSlice";
import { getDocPagePath } from "@/shared/config/routePaths";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v1 } from "uuid";

export const useStartNewDoc = () => {
  const { isServerEnabled } = useServer();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentState } = useAppSelector(state => state.doc);
  const [createDoc] = useCreateDocMutation();

  const onStartNewProject = useCallback(async () => {
    const id = v1();
    if (isServerEnabled) {
      // Создаем документ на сервере
      await createDoc({ id, doc: { name: currentState.docName, pages: currentState.pages } });
      navigate(getDocPagePath(id))
    } else {
      // Создаем документ локально
      dispatch(docActions.onInitState({ id, isLocalDoc: true }));
      navigate(getDocPagePath(id))
    }

  }, [createDoc, navigate, isServerEnabled, currentState.docName, currentState.pages, dispatch]);

  return {
    onStartNewProject
  }
}