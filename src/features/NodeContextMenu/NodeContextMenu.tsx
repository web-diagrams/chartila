import { useAppDispatch } from "@/app/hooks";
import { ContextMenu } from "@/shared/ContextMenu";
import { ContextOption, StateType } from "@/shared/ContextMenu/model/contexMenuTypes";
import { Node } from 'reactflow';

interface Props {
  state: StateType;
  isOpen: boolean;
  node: Node;
};

export const NodeContextMenu = ({
    state, isOpen,
}: Props) => {
    const dispatch = useAppDispatch();
    
    const onChangeColor = () => {

    }

    const options: ContextOption[] = [
        {
            label: 'Color',
            // icon: <MdOutlineTextFields size={15}/>,
            onClick: onChangeColor,
            type: 'button',
        },
    ]
        
    if (isOpen) {
        return (
            <ContextMenu state={state} options={options} />
        )
    }
}