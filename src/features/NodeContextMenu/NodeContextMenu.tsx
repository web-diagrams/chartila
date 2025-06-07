import { useAppDispatch } from "@/app/hooks";
import { StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import { Node } from 'reactflow';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from '../../shared/ContextMenu/ui/ContextMenu.module.scss';
import style from './NodeContextMenu.module.scss';
import { MdCode } from "react-icons/md";
import { docActions } from "@/redux/doc/slice/docSlice";
import { Language } from "@/redux/doc/interfaces/docStateInterfaces";
import { languages } from "@/redux/doc/constants/constants";
import { classNames } from "@/utils";

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
                    <DropdownMenu.Item className={styles.contextItem}>
                        Color
                        <input value={node.data.color} type='color' />
                    </DropdownMenu.Item>
                    {node.data.nodeType === 'codeNode' && <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className={classNames(styles.contextItem, {}, [style.languageItem])}>
                            <div className={style.languageStack}>
                                <MdCode size={15} style={{ marginRight: 8 }} />
                                Language
                            </div>
                            <label className={style.languageLabel}>{node.data.language}</label>
                        </DropdownMenu.SubTrigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent
                                className={styles.container}
                                sideOffset={10}
                            >
                                {Object.keys(languages).map((lang) => (
                                    <DropdownMenu.Item
                                        key={lang}
                                        className={styles.contextItem}
                                        onClick={() => onChangeCodeNode(lang as Language)}
                                    >
                                        <span className={styles.contextItem}>{lang}</span>
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        )
    }
}