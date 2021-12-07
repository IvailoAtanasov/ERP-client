import React from 'react'
import { TextField } from '@material-ui/core';

export const Input = (props) => {

    const { name, type, label, value, onChange, error=null, ...other } = props;
    return (
        <TextField
            variant="outlined"
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error: true, helperText:error})}
            
        />
    )
}
