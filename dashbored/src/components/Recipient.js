import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleDialog } from './SelectSendTo';
import DoneIcon from '@material-ui/icons/Done';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const Recipient = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;
    const [open, setOpen] = React.useState(false);
    //const [selectedValue, setSelectedValue] = React.useState("");
    const handleClickOpen = () => {
        setOpen(prv => !prv);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
        dispatch({ type: actions.Assign, Recipient: value, id: pdfitem.id })

    };
    const clear = () => {
        // setSelectedValue("");
        dispatch({ type: actions.Assign, Recipient: "", id: pdfitem.id })
    }

    return (
        <div className="Recipient">

            {pdfitem.SendTo === "" ?
                <div className="SendTo">
                    <IconButton aria-label="delete" className={classes.sendTo} onClick={handleClickOpen}>
                        <ContactMailIcon fontSize="small" />
                    </IconButton>
                </div> :
                <div className="SendTo" style={{ fontSize: '10px' }}>
                    <Fab variant="extended" onClick={() => { dispatch({ type: actions.AssignRecipient }) }} className={classes.recipient}>
                        <ContactMailIcon fontSize="small" className={classes.contactIcon} />
                        {pdfitem.SendTo}
                        {pdfitem.Transactions[0].isLink && <LinkOffIcon />}
                        <CloseIcon className={classes.closebtn} onClick={clear} />
                    </Fab>
                </div>}
            <SimpleDialog selectedValue={pdfitem.SendTo} open={open} onClose={handleClose} />
        </div>
    )
}
export default Recipient;