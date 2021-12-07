import React from 'react'
import {Button as MuiButton, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1)
    },
    label: {
        textTransform: 'none'
    }
}))

export const Button = (props) => {
    const classes = useStyles();
    const {text, size, color, variant, onClick, type, ...other} = props

    return (
        <MuiButton 
            type={type}
            variant={variant}
            size={size}
            color={color}
            onClick={onClick}
            classes={{root: classes.root, label: classes.label}}
            {...other}
        >
            {text}
        </MuiButton>
    )
}
