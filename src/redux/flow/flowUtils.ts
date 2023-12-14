import { v1 } from 'uuid'
import { DtoPage } from './interfaces/dtoInterfaces'
import { FlowState, ICodeNode } from './interfaces/flowStateInterfaces'

export const dtoToFlow = (page: DtoPage): FlowState => {
    return {
        nodes: page.nodes,
        edges: page.edges ?? []
    }
}

export const createNode = (state: FlowState, type: 'stringNode' | 'codeNode') => {
    switch (type) {
        case 'stringNode': {
            const id = v1()
            state.nodes.push({
                id: id,
                type: 'stringNode',
                data: { value: '', id: id },
                position: { x: 300, y: 50 },
            })
            break
        }
        case 'codeNode': {
            const id = v1()
            state.nodes.push({
                id: id,
                type: 'codeNode',
                data: {
                    value: '',
                    id: id,
                    isWrapped: false
                } as ICodeNode,
                position: { x: 300, y: 50 },
            })
        }
    }
}