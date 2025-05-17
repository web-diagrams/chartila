import styles from './DiagramButtons.module.scss';
import { useAppSelector } from "@/app/hooks";
import { SaveToImage } from "./Buttons/SaveToImage";
import { SaveDoc } from "./Buttons/SaveDoc";
import { UndoRedo } from "./Buttons/UndoRedo";
import { BackToStartPage } from "./Buttons/BackToStartPage";

interface DiagramButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
}

/**
 * Компонент для отображения кнопок управления диаграммой
 * @param onUndo - функция для отмены последнего действия
 * @param onRedo - функция для повторения последнего действия
 * @param onSave - функция для сохранения диаграммы 
 */
export const DiagramButtons = ({
  onUndo, onRedo, onSave,
}: DiagramButtonsProps) => {
  const { step, history } = useAppSelector((state) => state.doc);
  return (
    <div className={styles.controlsContainer}>
      <UndoRedo
        onUndo={onUndo}
        onRedo={onRedo}
        step={step}
        historyLength={history?.length ?? 0}
      />
      <SaveDoc onSave={onSave} />
      <SaveToImage />
      <BackToStartPage />
    </div>
  )
}