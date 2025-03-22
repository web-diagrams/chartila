import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Diagram } from "@/features/Diagram/ui/Diagram";
import { docActions } from "@/redux/doc/slice/docSlice";
import { useSaveToFile } from "@/shared/hooks/useSaveToFile";
import { getFileFromDB } from "@/shared/lib/indexDb";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const LocalDoc = () => {
  const { docId = '' } = useParams();
  const dispatch = useAppDispatch();
  const isInited = useAppSelector(state => state.doc.isInited);
  const { onSave: saveToFile } = useSaveToFile();

  const loadFile = async () => {
    const fileData = await getFileFromDB(docId);
    if (fileData) {
      // Если в IndexDb есть файл то кладе его в slice
      dispatch(docActions.onLoadDoc(fileData))
    }
  };

  const onSave = () => {
    saveToFile();
    dispatch(docActions.onSave({ id: docId }));
  }

  useEffect(() => {
    loadFile();
  }, [])

  if (!isInited) {
    return <p>'Загрузка и подготовка графика ...'</p>
  }

  return (
    <Diagram onSave={onSave} />
  )
}