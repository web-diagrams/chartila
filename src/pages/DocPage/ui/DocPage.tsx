import 'reactflow/dist/style.css';

import { useParams } from 'react-router-dom';
import { useLazyDocQuery } from '@/app/api/docsApi';
import { Diagram } from '@/features/Diagram/ui/Diagram';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useServer } from '@/app/providers/ServerProvider/ServerProvider';
import { getFileFromDB } from '@/shared/lib/indexDb';

export const DocPage = () => {
  const dispatch = useAppDispatch();
  const { docId = '' } = useParams();
  const isInited = useAppSelector(state => state.doc.isInited);
  const { isServerEnabled } = useServer();
  const [getDoc, {data: docInfo}] = useLazyDocQuery();

  useEffect(() => {
    if (isServerEnabled && !isInited) {
      // Если сервер работает, запрашиваем док с сервера
      getDoc({id: docId});
    } else if (!isInited) {
      // Если сервер не работает, берем из IndexDB
      const loadFile = async () => {
        const fileData = await getFileFromDB(docId);
        if (fileData) {
          // Если в IndexDb есть файл то кладе его в slice
          dispatch(docActions.onLoadDoc(fileData))
        } else {
          // Если в IndexDb нет файла то значит это новый локальный файл
        }
      };
  
      loadFile();
    }
  }, [isServerEnabled]);

  // Кладем в slice док с сервера
  useEffect(() => {
    if (!isInited && docInfo) {
      dispatch(docActions.onLoadDoc(docInfo))
    }
  }, [isInited, docInfo])

  useEffect(() => {
    () => {
      dispatch(docActions.onResetState());
    }
  }, [])

  if (!isInited) {
    return <p>'Загрузка и подготовка графика ...'</p>
  }

  return (
    <Diagram />
  );
};
