import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import deLocale from "date-fns/locale/bg"


export const DatePicker = (props) => {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
            <KeyboardDatePicker  disableToolbar  inputVariant="outlined"
                label={label}
                formate={"dd/MM/yyyy"}
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}
