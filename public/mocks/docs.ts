import { DocDto, DocInfoDto } from "@/shared/types/doc";

export const docs: DocInfoDto[] = [
  {
    "id": "aa92c72c-fc31-4505-b43a-f69f777d17bd",
    "name": "readonlyExample",
    "editDate": "2024-11-09T09:36:22",
    "mode": "READONLY"
  }
]


export const doc: DocDto = {
  name: "readonlyExample",
  pages: [
    {
      id: '1',
      pageName: 'first',
      nodes: [],
      edges: [],
    }
  ]
}