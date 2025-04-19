import { getStartPath } from "@/shared/config/routePaths";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from '../DiagramButtons.module.scss';
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";

/**
 * Кнопка для возврата на стартовую страницу
 */
export const BackToStartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleBackToStartPage = () => {
    dispatch(docActions.onResetState());
    navigate(getStartPath());
  };

  return (
    <button
      onClick={handleBackToStartPage}
      title="back to start page"
      className={styles.control}
    >
      <FaHome size={15} />
    </button>
  );
}