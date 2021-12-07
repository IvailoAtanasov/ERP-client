import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import React from 'react'

export const Select = (props) => {

    const {name, label, value, onChange, options, error=null, readOnly} = props;
    const getDisabled = val => {
        if (val) return "disabled";
        return "";
      }

      console.log(getDisabled(readOnly))

    return (
        <FormControl variant='outlined' disabled={readOnly ? true: null} {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect 
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="" ></MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
    )
}
