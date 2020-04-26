import React, { useContext } from 'react'
import { db, actions } from '../Store'
import Logo from '../assets/logo.svg'
import Fab from '@material-ui/core/Fab'

const HeaderAuthOut = () => {
    const { state, dispatch } = useContext(db)
    const settings = () => {
        dispatch({ type: actions.isSettings, isSettings: true })
    }
    return (
        <div className="Logo-Section">
            <img src={Logo} style={{ gridColumn: '1/4', height: '140px' }} alt="" />
        </div>
    )
}

export default HeaderAuthOut;