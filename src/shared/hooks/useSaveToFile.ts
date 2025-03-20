import { useGetDocState } from '@/redux/doc/hooks/useGetDocState';
import { useCallback } from 'react';

export const useSaveToFile = () => {
  const { pages, currentPageId } = useGetDocState();

  return {
    onSave: useCallback(() => {
      const fileName = 'random';

      const json = JSON.stringify({ pages: pages }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const href = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + '.json';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    }, [pages]),
  };
};
