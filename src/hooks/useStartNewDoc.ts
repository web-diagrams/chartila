import { useCreateDocMutation } from "@/app/api/docsApi";
import { getDocPagePath } from "@/shared/config/routePaths";
import { useNavigate } from "react-router-dom";
import { v1 } from "uuid";

export const useStartNewDoc = () => {
  const navigate = useNavigate();
  const [createDoc] = useCreateDocMutation();

  const onStartNewProject = async () => {
    const id = v1();
    const res = await createDoc({ id });
    if (!('error' in res)) {
      navigate(getDocPagePath(id))
    }
  }

  return {
    onStartNewProject
  }
}