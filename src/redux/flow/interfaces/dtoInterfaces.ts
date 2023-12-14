import { Edge, Node } from "reactflow"

export type FlowFile = {
    pages: DtoPage[]
}

export type DtoPage = {
    id: string,
    pageName: string,
    nodes: Node[],
    edges: Edge[],
}