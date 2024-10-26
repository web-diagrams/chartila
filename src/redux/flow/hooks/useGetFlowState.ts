import { useAppSelector } from '@/app/hooks';
export const useGetFlowState = () => {
  const { currentState } = useAppSelector((state) => state.flow);
  return currentState;
};
