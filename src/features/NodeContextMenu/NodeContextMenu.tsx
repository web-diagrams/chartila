import { useAppDispatch } from "@/app/hooks";
import { StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import { Node } from 'reactflow';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from '../../shared/ContextMenu/ui/ContextMenu.module.scss';
import { MdCode } from "react-icons/md";
import { docActions } from "@/redux/doc/slice/docSlice";
import { Language } from "@/redux/doc/interfaces/docStateInterfaces";

interface Props {
  state: StateType;
  node: Node | null;
  onClose: () => void;
};

export const NodeContextMenu = ({
    state, node, onClose,
}: Props) => {
    const dispatch = useAppDispatch();
    const onChangeCodeNode = (language: Language) => {
        dispatch(docActions.onChangeCodeNode({
            id: node?.id ?? '',
            key: 'language',
            value: language,
        }));
    }

    if (node) {
        return (
            <DropdownMenu.Root open onOpenChange={onClose}>
                <DropdownMenu.Content
                    className={styles.container}
                    style={{
                    top: state.style.top,
                    left: state.style.left,
                    }}
                >
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className={styles.contextItem}>
                            <MdCode size={15} style={{ marginRight: 8 }} />
                            Language
                            <label>{node.data.language}</label>
                        </DropdownMenu.SubTrigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent
                                className={styles.container}
                                sideOffset={10}
                            >
                                <DropdownMenu.Item className={styles.contextItem} onClick={() => onChangeCodeNode('javascript')}>JavaScript</DropdownMenu.Item>
                                <DropdownMenu.Item className={styles.contextItem} onClick={() => onChangeCodeNode('java')}>Java</DropdownMenu.Item>
                                <DropdownMenu.Item className={styles.contextItem} onClick={() => onChangeCodeNode('python')}>Python</DropdownMenu.Item>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        )
    }
}