import { useCreateDocMutation } from "@/app/api/docsApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useAuth } from "@/app/providers/AuthProvider";
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
  const { isAuth } = useAuth();

  const onStartNewProject = useCallback(async () => {
    const id = v1();
    if (isServerEnabled && isAuth) {
      // Если сервер доступен и пользователь авторизован, то создаем документ на сервере
      await createDoc({ name: currentState.docName, pages: currentState.pages, id });
      navigate(getDocPagePath(id))
    } else {
      // Создаем документ локально
      dispatch(docActions.onInitState({ id, isLocalDoc: true }));
      navigate({
        pathname: getDocPagePath(id),
        search: `?local=true`,
      });
    }

  }, [createDoc, navigate, isServerEnabled, currentState.docName, currentState.pages, dispatch]);

  return {
    onStartNewProject
  }
}