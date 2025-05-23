import { useAppDispatch } from "@/app/hooks";
import { classNames } from "@/utils"
import { useNavigate } from "react-router-dom";
import s from '../StartWindow/StartWindow.module.scss'
import { parseDocFile } from "../../model/util/parseDocFile";
import { uploadFile } from "@/redux/doc/services/uploadFile";
import { getDocPagePath } from "@/shared/config/routePaths";

export const UploadButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const doc = await parseDocFile(file);
      dispatch(uploadFile({ doc, fileName: file.name }));
      navigate({
        pathname: getDocPagePath(doc.id),
        search: `?local=true`,
      });
    } catch (err) {
      console.error("Ошибка при чтении файла", err);
    }
  };

  return (
    <label className={classNames(s.secondary, {}, [])}>
      <input onInput={handleUploadFile} type="file" />
      Загрузить с компьютера
    </label>
  )
}