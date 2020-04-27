import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuDrawer from './MenuDrawer'

const FileSettings = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <IconButton aria-label="settings" className={classes.margin} onClick={() => setOpen(prev => !prev)}>
                <SettingsIcon fontSize="small" />
            </IconButton>
            {open && <MenuDrawer state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} open={open} />}
        </div>
    )
}
export default FileSettings;