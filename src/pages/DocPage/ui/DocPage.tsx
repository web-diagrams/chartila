import 'reactflow/dist/style.css';

import { useServer } from '@/app/providers/ServerProvider/ServerProvider';
import { ServerDoc } from './ServerDoc/ServerDoc';
import { LocalDoc } from './LocalDoc/LocalDoc';
import Pages from '@/components/Pages/Pages';
import { useSearchParams } from 'react-router-dom';

export const DocPage = () => {
  const { isServerEnabled } = useServer();
  const [searchParams] = useSearchParams();
  // local = true - открываем файл с компьютера
  const isLocalDoc = searchParams.get('local') === 'true';

  return (
    <>
      {(isServerEnabled && !isLocalDoc)
        ? <ServerDoc />
        : <LocalDoc />
      }
      <Pages />
    </>
  )
};
