import { useEffect, useRef } from 'react';

export const useKey = (cb: (event: KeyboardEvent) => void) => {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      callback.current(event);
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);
};
