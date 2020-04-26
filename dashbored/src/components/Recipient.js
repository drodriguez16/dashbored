import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleDialog } from './SelectSendTo'
const Recipient = (props) => {
    const { classes, state, dispatch, actions } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState("");
    const handleClickOpen = () => {
        setOpen(prv => !prv);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    const clear = () => {
        setSelectedValue("");
    }

    return (
        <div className="Recipient">

            {selectedValue === "" ?
                <div className="SendTo">
                    <IconButton aria-label="delete" className={classes.sendTo} onClick={handleClickOpen}>
                        <ContactMailIcon fontSize="small" />
                    </IconButton>
                </div> :
                <div className="SendTo" style={{ fontSize: '10px' }}>
                    <Fab variant="extended" onClick={() => { dispatch({ type: actions.AssignRecipient }) }} className={classes.recipient}>
                        <ContactMailIcon fontSize="small" className={classes.contactIcon} />   {selectedValue} <CloseIcon className={classes.closebtn} onClick={clear} />
                    </Fab>
                </div>}
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    )
}
export default Recipient;