import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export const RadioGroup = (props) => {

    const { name, label, value, onChange, items, readOnly } = props;
    return (
        <FormControl disabled={readOnly ? true: null}>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    items.map(
                        (item) => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
