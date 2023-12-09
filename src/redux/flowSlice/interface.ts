import { Edge, Node } from "reactflow";

export interface FlowState {
    nodes: Node[],
    edges: Edge[]
}

export interface IStringNode extends Node {
    value: string
}

export interface ICodeNode extends Node {
    value: string
    isWrapped: boolean
}