import React, { useContext } from 'react'
import { db, actions } from '../Store'
import Logo from '../assets/logo.svg'
import { FaCog } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import './Header.scss'

const useStyles = makeStyles(() => ({
    HeaderInCog: { backgroundColor: '#0091ea' }
}));
const HeaderAuthIn = () => {
    const { state, dispatch } = useContext(db)
    const settings = () => { dispatch({ type: actions.isSettings, isSettings: true }) }
    const classes = useStyles();
    return (
        <div className="Logo-Section">
            <img src={Logo} alt="" />
            <div id="InCog">

                {!state.Settings.isSettings && <Fab color="primary" aria-label="add" onClick={settings} className={classes.HeaderInCog}>
                    <FaCog className="HeaderInCog" />
                </Fab>}

                {state.Settings.isSettings && <Fab color="primary" aria-label="add" onClick={settings} className={classes.HeaderInCog}>
                    <MdClose className="HeaderInCog" />
                </Fab>}
                {state.Settings.fullname !== "" && (<div className="Greetings">Hi, {state.Settings.fullname}</div>)}
            </div>
        </div>
    )
}

export default HeaderAuthIn;