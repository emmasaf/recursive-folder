import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { ITrashButtonProps } from '../entities/inerfaces'
import { Divider, IconButton } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RestoreIcon from '@mui/icons-material/Restore'
import { Delete } from '@mui/icons-material'

const Trash: React.FC<ITrashButtonProps> = ({
  handleCleanAll,
  items,
  handleRestore,
  handleDelete
}) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
        <DeleteOutlineIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Trash Items</DialogTitle>
        <DialogContent>
          <List aria-label="mailbox folders">
            {items?.map(item => (
              <div key={item.id}>
                <ListItem >
                  <ListItemText primary={item.name} />
                  <IconButton
                    aria-label="restore"
                    color="primary"
                    onClick={() => {
                      handleRestore(item.id)
                    }}
                  >
                    <RestoreIcon />
                  </IconButton>
                  <IconButton
                    aria-label="restore"
                    color="primary"
                    onClick={() => {
                      handleDelete(item.id)
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
                <Divider component="li" />
              </div>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" color="error" onClick={handleCleanAll}>
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Trash
