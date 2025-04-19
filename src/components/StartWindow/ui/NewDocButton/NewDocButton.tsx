import { useStartNewDoc } from "@/hooks/useStartNewDoc";
import s from '../StartWindow/StartWindow.module.scss';

/**
 * Кнопка для создания нового документа
 */
export const NewDocButton = () => {
  const { onStartNewProject } = useStartNewDoc();
  return (
    <button onClick={onStartNewProject} className={s.primary}>
      Создать новый документ
    </button>
  )
}