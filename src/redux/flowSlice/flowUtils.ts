import { Page } from '../listSlice/interface'
import { FlowState } from './interface'

export const dtoToFlow = (page: Page): FlowState => {
    return {
        nodes: page.nodes,
        edges: page.edges ?? []
    }
}