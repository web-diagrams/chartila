import 'reactflow/dist/style.css';

import { useServer } from '@/app/providers/ServerProvider/ServerProvider';
import { ServerDoc } from './ServerDoc/ServerDoc';
import { LocalDoc } from './LocalDoc/LocalDoc';

export const DocPage = () => {
  const { isServerEnabled } = useServer();

  if (isServerEnabled) {
    return (
      <ServerDoc />
    )
  }

  return (
    <LocalDoc />
  );
};
