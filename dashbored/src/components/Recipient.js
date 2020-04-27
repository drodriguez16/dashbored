import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import { SimpleDialog } from './SelectSendTo';
import DoneIcon from '@material-ui/icons/Done';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import Popover from '@material-ui/core/Popover';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';

const Recipient = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickOpen = () => {
        setOpen(prv => !prv);
    };
    const handleClose = (value) => {
        setOpen(false);
        dispatch({ type: actions.Assign, Recipient: value, id: pdfitem.id })
    };
    const clear = () => {
        dispatch({ type: actions.Assign, Recipient: "", id: pdfitem.id })
    }
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const LinkOff = () => {
        dispatch({ type: actions.LinkOff, transId: 0, id: pdfitem.id })
    }
    const openPopover = Boolean(anchorEl);
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
                        {pdfitem.Transactions[0].isLink && pdfitem.Transactions[0].LinkOff && <LinkOffIcon className={classes.LinkOffIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        {pdfitem.Transactions[0].isLink && !pdfitem.Transactions[0].LinkOff && <LinkOutlinedIcon className={classes.LinkOnIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        <Popover className={classes.popover} classes={{ paper: classes.paper, }} open={openPopover} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            onClose={handlePopoverClose} disableRestoreFocus>
                            {pdfitem.Transactions[0].LinkOff && <div style={{ fontSize: '10px' }}>Turn Link Off</div>}
                            {!pdfitem.Transactions[0].LinkOff && <div style={{ fontSize: '10px' }}>Turn Link On</div>}

                        </Popover>
                        <CloseIcon className={classes.closebtn} onClick={clear} />
                    </Fab>
                </div>}
            <SimpleDialog selectedValue={pdfitem.SendTo} open={open} onClose={handleClose} />
        </div>
    )
}
export default Recipient;