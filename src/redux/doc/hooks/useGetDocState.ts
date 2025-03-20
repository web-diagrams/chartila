import { useAppSelector } from '@/app/hooks';
export const useGetDocState = () => {
  const { currentState } = useAppSelector((state) => state.doc);
  return currentState;
};
