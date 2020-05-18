import React, { useContext } from 'react'
import { db, actions } from '../../Store'
import Logo from '../../assets/logo.svg'
import { FaCog } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import avaImg from '../../assets/Avatar.jpg'
import './Header.scss'

const useStyles = makeStyles(() => ({
    HeaderInCog: { backgroundColor: '#dcdcdc' },
    Avatar: { fontSize: '55px' },
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
                    <>
                        {state.Settings.AvatarName === "" ?
                            <AccountCircleIcon className={classes.Avatar} /> :
                            <Avatar alt="Cindy Baker" src={avaImg.replace("Avatar.jpg", state.Settings.AvatarName)} />}
                    </>
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