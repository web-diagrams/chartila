import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from 'reactflow';
import { FaRegFileImage } from "react-icons/fa";
import { toPng } from 'html-to-image';
import styles from '../DiagramButtons.module.scss';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

export const SaveToImage = () => {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
    );
    const node = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!node) return;
    toPng(node, {
      // backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString() + 'px',
        height: imageHeight.toString() + 'px',
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <button
      className={styles.control}
      title="save to png"
      onClick={onClick}
    >
      <FaRegFileImage size={15} />
    </button>
  );
}
