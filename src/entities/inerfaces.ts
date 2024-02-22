export interface IData {
  id: number
  name: string
  children: IData[]
  parent: null | number
  type: string
}

export interface IFloat {
  id: number,
  name: string
  type: string
  parent: number | null
  content?: string
}

export interface IFileFolder {
  name: string
  setName: Function
  handleCreateFolder: () => void
  handleCreateFile: () => void

}

export interface IFolderProps {
  name: string;
  onClick: () => void
  parentId: string
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface IDocumentProps {
  name: string;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClick: () => void
}
export interface iGoBackButton {
  onClick: () => void
}

export interface INotifyProps {
  message: string;
  status?: 'success' | 'error' | 'info' | 'warning';
  open: boolean
}

export interface ITrashButtonProps {
  items: IFloat[];
  handleRestore: (fId: number) => void
  handleCleanAll: ()=>void
  handleDelete:(id:number)=>void
}
export interface IDocContent {
  setRealData?:(value:IFloat[])=>void
  realData:IFloat[]
}