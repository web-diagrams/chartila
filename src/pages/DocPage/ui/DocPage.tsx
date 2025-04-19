import 'reactflow/dist/style.css';

import { useServer } from '@/app/providers/ServerProvider/ServerProvider';
import { ServerDoc } from './ServerDoc/ServerDoc';
import { LocalDoc } from './LocalDoc/LocalDoc';
import Pages from '@/components/Pages/Pages';
import { PageSettings } from '@/components/PageSettings/PageSettings';

export const DocPage = () => {
  const { isServerEnabled } = useServer();

  return (
    <>
      {isServerEnabled
        ? <ServerDoc />
        : <LocalDoc />
      }
      <Pages />
    </>
  )
};
