import React, { useState } from 'react'
import { IDocContent } from '../entities/inerfaces'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
const Content: React.FC<IDocContent> = ({ setRealData, realData }) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [searchParams] = useSearchParams()
  const fileId = searchParams.get('fileId') || 1
  let file = [...realData].filter(({ id }) => id === +fileId)[0]
  const [text, setText] = useState<string>(file?.content || '')

  const handleSave = () => {
    file.content = text
    realData = realData.filter(({ id }) => id !== +fileId)
    setRealData?.([...realData,file])
    handleClose()
  }
  return (
    <div className="p-4 border border-gray-200 shadow-md rounded">
      <p>{file?.content}</p>
      <Button variant="contained" onClick={handleOpen} className="mt-2">
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-3">
            <TextField
              multiline
              rows={'8'}
              fullWidth
              variant="outlined"
              label="Edit Text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Content
