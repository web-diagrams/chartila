import { useAppDispatch } from "@/app/hooks";
import { NodeData } from "@/redux/doc/constants/constants";
import { docActions } from "@/redux/doc/slice/docSlice";
import { ContextMenu } from "@/shared/ContextMenu"
import { ContextOption, StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import { MdOutlineTextFields } from "react-icons/md";
import { MdCode } from "react-icons/md";

interface Props {
  state: StateType;
  isOpen: boolean;
};

export const DiagramContextMenu = ({
    state, isOpen,
}: Props) => {
    const dispatch = useAppDispatch();

    const onAddTextNode = () => {
        dispatch(docActions.onAddNode({ type: NodeData.STRING_NODE, position: state.nodePosition }))
    }
    const onAddCodeNode = () => {
        dispatch(docActions.onAddNode({ type: NodeData.CODE_NODE, position: state.nodePosition }))
    }

    const options: ContextOption[] = [
        {
            label: 'Text',
            icon: <MdOutlineTextFields size={15}/>,
            onClick: onAddTextNode,
            type: 'button',
        },
        {
            label: 'Code',
            icon: <MdCode size={15} />,
            onClick: onAddCodeNode,
            type: 'button',
        },
    ]

    if (isOpen) {
        return (
            <ContextMenu state={state} options={options} />
        )
    }

    return (
        null
    );
}
