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

export type File = {
    pages: Page[]
}

type Page = {
    id: string,
    pageName: string,
    nodes: PageNode[],
    links: Link[],
}

enum NodeType {
    CODE = 'code',
    STRING = 'string'
}

type Position = {
    x: number,
    y: number,
    z: number,
}

type PageNode = {
    id: string,
    type: NodeType,
    position: Position,
}

type Link = {
    id: string,

    /**От какой ноды отходит линия */
    source: string,
    /**К какой ноде идет линия */
    target: string,

    /**От какой точки ноды отходит линия */
    sourceHandle: 'c',
    /**К какой точке ноды идет линия */
    targetHandle: 'a',
}