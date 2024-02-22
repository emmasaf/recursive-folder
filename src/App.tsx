import React, { useEffect, useState } from 'react'
import './App.css'
import { IFloat, INotifyProps } from './entities/inerfaces'
import { floatBoxes } from './entities/initialData'
import FileFolderCreator from './components/FileFolderCreator'
import Folder from './components/Folder'
import Document from './components/Document'
import { useNavigate, useSearchParams } from 'react-router-dom'
import GoBackButton from './components/GoBackButton'
import { Alert, Snackbar } from '@mui/material'
import Trash from './components/Trash'
import Content from './components/DocumentContent'

function App() {
  /**
   * Variables
   */
  const [name, setName] = useState<string>('')
  const [data, setData] = useState<IFloat[] | []>(floatBoxes)
  const [deletedData, setDeletedData] = useState<IFloat[] | []>(floatBoxes)
  const [restoreItem, setRestoreItem] = useState<IFloat[]>([])
  const [open, setOpen] = useState<INotifyProps>({
    message: '',
    open: false,
  })
  const [realData, setRealData] = useState<IFloat[] | []>(floatBoxes)
  const [searchParams, setSearchParams] = useSearchParams()
  const folderId = searchParams.get('folderId')
  const fileId = searchParams.get('fileId')

  const navigate = useNavigate()

  /**
   * Functions
   */
  const handleCreate = (type: string): void => {
    if (name.trim()) {
      const isNameExist = data.some(
        item => item.name === name.trim() && item.type === type,
      )

      if (!isNameExist) {
        const obj = {
          id: Math.round(Math.random() * 1000000000),
          type: type,
          name: name.trim(),
          parent: !folderId ? null : +folderId,
        }
        setName('')
        setRealData([...realData, obj])
        setOpen({
          message: `${type} was successfully added`,
          open: true,
          status: 'success',
        })
      } else {
        setOpen({
          message: `${type} with this name already exists`,
          open: true,
          status: 'error',
        })
      }
    } else {
      setOpen({
        message: `${type} name is required`,
        open: true,
        status: 'warning',
      })
    }
  }

  const handleRestore = (fId: number): void => {
    const delItem: IFloat = deletedData.filter(({ id }) => id === fId)[0]
    const fData: IFloat[] = [...realData].filter(
      ({ parent }) => parent === delItem.parent,
    )
    const isNameExist = fData.some(
      item => item.name === delItem.name && item.type === delItem.type,
    )
    if (!isNameExist) {
      const toRestore = new Set<number>()
      let restoredItems: IFloat[] = []
      const findAndRestore = (parentId: number) => {
        for (const item of deletedData) {
          if (item.parent === parentId) {
            restoredItems.push(item)
            toRestore.add(item.id)
          }
        }
      }
      findAndRestore(fId)

      while (toRestore.size > 0) {
        const currentToDelete = Array.from(toRestore)
        toRestore.clear()
        currentToDelete.forEach(id => findAndRestore(id))
      }
      restoredItems.push(delItem)
      let remainingItems: IFloat[] = deletedData.filter(
        item =>
          !restoredItems.find(
            (delItem: { id: number }) => delItem.id === item.id,
          ),
      )

      setRestoreItem(restoreItem.filter(item => item.id !== delItem.id))
      setDeletedData(remainingItems.filter(({ id }) => id !== fId))
      setRealData([...realData, ...restoredItems])
      setOpen({
        message: `Item was successfuly restored`,
        open: true,
        status: 'success',
      })
    } else {
      setOpen({
        message: `${delItem.type} name is already exist`,
        open: true,
        status: 'error',
      })
    }
  }

  const handleDelete = (fId: number): void => {
    const toDelete = new Set<number>()
    let deletedItems: IFloat[] = []
    const findAndDelete = (parentId: number) => {
      for (const item of realData) {
        if (item.parent === parentId) {
          setDeletedData(prev => [...prev, item])
          deletedItems.push(item)
          toDelete.add(item.id)
        }
      }
    }

    findAndDelete(fId)

    while (toDelete.size > 0) {
      const currentToDelete = Array.from(toDelete)
      toDelete.clear()
      currentToDelete.forEach(id => findAndDelete(id))
    }

    let remainingItems: IFloat[] = realData.filter(
      item =>
        !deletedItems.find((delItem: { id: number }) => delItem.id === item.id),
    )
    const delItem: IFloat = realData.filter(({ id }) => id === fId)[0]
    setDeletedData(prev => [...prev, delItem])
    setRestoreItem(prev => [...prev, delItem])
    setRealData(remainingItems.filter(({ id }) => id !== fId))

    setOpen({
      message: 'Item was successfult deleted',
      open: true,
      status: 'success',
    })
  }
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen({
      message: '',
      open: false,
    })
  }
  const handleChangeParamsFolder = (id: string): void => {
    setSearchParams({ folderId: id })
    let filteredData: IFloat[] = data.filter(({ parent }) => parent === +id)
    setData(filteredData)
  }
  const handleChangeParamsFile = (id: string): void => {
    setSearchParams({ folderId: String(folderId), fileId: id })
    let filteredData: IFloat[] = data.filter(({ parent }) => parent === +id)
    setData(filteredData)
  }

  const handleCleanAll = (): void => {
    setDeletedData([])
    setRestoreItem([])
  }

  const handleCleanById = (fId: number): void => {
    setRestoreItem(restoreItem.filter(({ id }) => id !== fId))
  }
  
  /**
   * Effects
   */
  useEffect(() => {
    if (!folderId) {
      const newData = [...realData].filter(({ parent }) => !parent)
      setData(newData)
    } else {
      const newData = [...realData].filter(({ parent }) => parent === +folderId)
      setData(newData)
    }
  }, [folderId, realData])

  return (
    <div className="App mt-4">
      <div className="w-full flex justify-start">
        {deletedData.length ? (
          <Trash
            handleDelete={handleCleanById}
            handleCleanAll={handleCleanAll}
            handleRestore={handleRestore}
            items={restoreItem}
          />
        ) : null}
      </div>
      <FileFolderCreator
        name={name}
        setName={setName}
        handleCreateFile={() => {
          handleCreate('file')
        }}
        handleCreateFolder={() => {
          handleCreate('folder')
        }}
      />

      {folderId && (
        <GoBackButton
          onClick={() => {
            navigate(-1)
          }}
        />
      )}

      <div className="flex items-center justify-center gap-3">
        {data.map(({ id, name, type, parent }) => {
          return (
            <div key={id}>
              {type === 'folder' ? (
                <Folder
                  onDelete={e => {
                    e.stopPropagation()
                    handleDelete(id)
                  }}
                  name={name}
                  onClick={() => {
                    handleChangeParamsFolder(String(id))
                  }}
                  parentId={String(parent)}
                />
              ) : (
                <Document
                  onDelete={e => {
                    e.stopPropagation()
                    handleDelete(id)
                  }}
                  onClick={() => {
                    handleChangeParamsFile(String(id))
                  }}
                  name={name}
                />
              )}
            </div>
          )
        })}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open.status}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {open.message}
        </Alert>
      </Snackbar>
      {fileId ? (
        <Content realData={realData} setRealData={setRealData} />
      ) : null}
    </div>
  )
}

export default App
