import { getStartPath } from "@/shared/config/routePaths";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from '../DiagramButtons.module.scss';

/**
 * Кнопка для возврата на стартовую страницу
 */
export const BackToStartPage = () => {
  const navigate = useNavigate();
  const handleBackToStartPage = () => {
    navigate(getStartPath())
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