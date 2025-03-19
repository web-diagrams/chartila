import { useCreateDocMutation } from "@/app/api/docsApi";
import { usePingQuery } from "@/app/api/pingApi";
import { useAppDispatch } from "@/app/hooks";
import { getDocPagePath } from "@/shared/config/routePaths";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v1 } from "uuid";

export const useStartNewDoc = () => {
  const dispatch = useAppDispatch();
  const { isError: isServerError } = usePingQuery(undefined);
  const navigate = useNavigate();
  const [createDoc] = useCreateDocMutation();

  const onStartNewProject = useCallback(async () => {
    const id = v1();
    if (isServerError) {
      // dispatch()
      navigate(getDocPagePath(id))
    } else {
      const res = await createDoc({ id });
      if (!('error' in res)) {
        navigate(getDocPagePath(id))
      }
    }

  }, [createDoc, navigate, isServerError]);

  return {
    onStartNewProject
  }
}