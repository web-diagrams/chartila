import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdCode, MdOutlineTextFields } from "react-icons/md";
import { StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import styles from '../../shared/ContextMenu/ui/ContextMenu.module.scss';
import { useAppDispatch } from "@/app/hooks";
import { docActions } from "@/redux/doc/slice/docSlice";
import { NodeData } from "@/redux/doc/constants/constants";

interface Props {
  isOpen: boolean;
  state: StateType;
  onClose: () => void;
}

export const DiagramContextMenu = ({ isOpen, state, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const onAddTextNode = () => {
    dispatch(docActions.onAddNode({ type: NodeData.STRING_NODE, position: state.nodePosition }))
  }
  const onAddCodeNode = () => {
    dispatch(docActions.onAddNode({ type: NodeData.CODE_NODE, position: state.nodePosition }))
  }

  const onClickOutside = () => {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <DropdownMenu.Root open onOpenChange={onClickOutside}>
      <DropdownMenu.Content
        className={styles.container}
        style={{
          top: state.style.top,
          left: state.style.left,
        }}
      >
        <DropdownMenu.Item className={styles.contextItem} onClick={onAddTextNode}>
          <MdOutlineTextFields size={15} style={{ marginRight: 8 }} />
          Text Node
        </DropdownMenu.Item>
        <DropdownMenu.Item className={styles.contextItem} onClick={onAddCodeNode}>
          <MdCode size={15} style={{ marginRight: 8 }} />
          Code Node
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
