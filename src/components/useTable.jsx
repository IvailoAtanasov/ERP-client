import { Table } from '@material-ui/core'
import React from 'react'

export const useTable = () => {

    const TblContainer = props => {
        <Table>
            {props.children}
        </Table>
    }
    return (
        TblContainer
    )
}


