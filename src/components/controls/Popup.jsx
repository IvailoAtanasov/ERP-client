import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Controls } from './controls'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        width: '65vw'
    }
}))

export const Popup = (props) => {
    const classes = useStyles()
    const { title, children, openPopup, setOpenPopup } = props
    return (
        <Dialog open={openPopup} maxWidth='large' classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div style={{display: 'flex'}}>
                    <Typography variant='h6' component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => {setOpenPopup(false)}}
                    >
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    )
}
