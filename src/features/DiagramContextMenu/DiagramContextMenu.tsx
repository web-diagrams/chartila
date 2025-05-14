import { useAppDispatch } from "@/app/hooks";
import { NodeData } from "@/redux/doc/constants/constants";
import { docActions } from "@/redux/doc/slice/docSlice";
import { ContextMenu } from "@/shared/ContextMenu"
import { StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import { Button } from "@/shared/ui/Button/Button";
import { IoTextOutline } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";

type Props = {
  state: StateType;
};

export const DiagramContextMenu = ({
    state   
}: Props) => {
    const dispatch = useAppDispatch();

    const onAddTextNode = () => {
        dispatch(docActions.onAddNode({ type: NodeData.STRING_NODE, position: state.nodePosition }))
    }
    const onAddCodeNode = () => {
        dispatch(docActions.onAddNode({ type: NodeData.CODE_NODE, position: state.nodePosition }))
    }

    return (
        <ContextMenu state={state}>
            <button
                onClick={onAddTextNode}
            >
                <IoTextOutline /> текстовая нода
            </button>
            <button
                onClick={onAddCodeNode}
            >
                <IoCodeSlash /> кодовая нода
            </button>
        </ContextMenu>
    )
}