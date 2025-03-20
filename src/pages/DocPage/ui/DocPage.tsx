import 'reactflow/dist/style.css';

import { useParams } from 'react-router-dom';
import { useLazyDocQuery } from '@/app/api/docsApi';
import { Diagram } from '@/features/Diagram/ui/Diagram';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { docActions } from '@/redux/doc/slice/docSlice';
import { useServer } from '@/app/providers/ServerProvider/ServerProvider';

export const DocPage = () => {
  const dispatch = useAppDispatch();
  const { docId } = useParams();
  const isInited = useAppSelector(state => state.doc.isInited);
  const { isServerEnabled } = useServer();
  const [getDoc, {data: docInfo}] = useLazyDocQuery();

  useEffect(() => {

    // Сервер работает
    if (isServerEnabled) {
      getDoc({id: docId ?? ''});
    }

    // Сервер не работает
    if (!isServerEnabled) {
      
    }
  }, [isServerEnabled]);

  useEffect(() => {
    if (!isInited && docInfo) {
      dispatch(docActions.onLoadDoc(docInfo))
    }
  }, [isInited, docInfo])

  if (!isInited) {
    return <p>'Загрузка и подготовка графика ...'</p>
  }

  return (
    <Diagram />
  );
};
