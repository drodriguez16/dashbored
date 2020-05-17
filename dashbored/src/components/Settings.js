import React, { useContext } from 'react'
import useForm from '../hooks/useForm'
import { db, actions, fauth, firebase, documents } from '../Store'
import './Settings.scss'
import { MdSave } from 'react-icons/md'
import { RiLogoutBoxLine } from 'react-icons/ri'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        backgroundColor: '#2391e9',
        color: 'white',
        width: '100%',
    },
}));

const Settings = () => {
    const { state, dispatch } = useContext(db);
    const [fields, setFields] = useForm({ fullname: state.Settings.fullname })
    const save = () => {
        firebase.database().ref(documents.settings(state.CurrentUser)).set({ isSettings: true, fullname: fields.fullname, AvatarName: 'Avatar.jpg' })
        const settings = { fullname: fields.fullname };
        dispatch({ type: actions.UpdateSettings, Settings: settings })
    }
    const signout = () => {
        fauth.signOut();
    }
    const classes = useStyles();
    return (<div className="Settings">
        <input type="text" name="fullname" onChange={setFields} value={fields.fullname} placeholder="Enter Full Name" />
        <div>
            <Fab variant="extended" onClick={save} className={classes.extendedIcon}>
                <MdSave />
                Save
            </Fab>
        </div>
        <div className="Logoutbox">
            <Fab variant="extended" onClick={signout} className={classes.extendedIcon}>
                <RiLogoutBoxLine />
                Logout
            </Fab>
        </div>
    </div>)
}

export default Settings;