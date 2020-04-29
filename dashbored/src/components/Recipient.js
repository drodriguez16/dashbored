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
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import './Recipient.scss'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Recipient = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickOpen = () => {
        setOpen(prv => !prv);
    };
    const handleClose = (value) => {
        ;
        setOpen(false);
        dispatch({ type: actions.Assign, transId: pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).id, Recipient: value, id: pdfitem.id })
    };
    const clear = () => {
        dispatch({ type: actions.CelearAssigned, Recipient: "", id: pdfitem.id })
    }
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const LinkOff = () => {
        dispatch({ type: actions.LinkOff, transId: pdfitem.Transactions.pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).id.id, id: pdfitem.id })
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
                        {pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).isLink && pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).LinkOff && <LinkOffIcon className={classes.LinkOffIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        {pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).isLink && !pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).LinkOff && <LinkOutlinedIcon className={classes.LinkOnIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        <Popover className={classes.popover} classes={{ paper: classes.paper, }} open={openPopover} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            onClose={handlePopoverClose} disableRestoreFocus>
                            {pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).LinkOff && <div style={{ fontSize: '10px' }}>Turn Link Off</div>}
                            {!pdfitem.Transactions.find(item => item.CreatedAt >= item.CreatedAt).LinkOff && <div style={{ fontSize: '10px' }}>Turn Link On</div>}

                        </Popover>
                        <CloseIcon className={classes.closebtn} onClick={clear} />
                    </Fab> + <span className="MoreRecipientsNumber">{pdfitem.Transactions.length}</span>
                </div>}
            <SimpleDialog selectedValue={pdfitem.SendTo} open={open} onClose={handleClose} />
        </div>
    )
}
export default Recipient;