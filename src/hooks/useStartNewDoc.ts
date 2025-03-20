import { useCreateDocMutation } from "@/app/api/docsApi";
import { useAppDispatch } from "@/app/hooks";
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
  const [createDoc] = useCreateDocMutation();

  const onStartNewProject = useCallback(async () => {
    const id = v1();
    if (!isServerEnabled) {
      dispatch(docActions.onInitState({ id }));
      navigate(getDocPagePath(id))
    } else {
      const res = await createDoc({ id });
      if (!('error' in res)) {
        navigate(getDocPagePath(id))
      }
    }

  }, [createDoc, navigate, isServerEnabled]);

  return {
    onStartNewProject
  }
}