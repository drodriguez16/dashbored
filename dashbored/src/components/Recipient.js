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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
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
    const { classes, state, dispatch, actions, pdfitem, fdb } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isMenu, setIsMenu] = React.useState(false);
    const [openTransListEl, setOpenTransListEl] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(prv => !prv);

    };
    const handleClose = (value) => {
        setOpen(false);
        setAnchorEl(null);
        if (value !== "")
            dispatch({ type: actions.TransactionQueue, Queue: { id: 0, SendTo: value, isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true }, pdfId: pdfitem.id })
    };
    const clear = () => {
        dispatch({ type: actions.CelearAssigned, pdfId: pdfitem.id })
    }
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const LinkOff = () => {
        const TransactionQueue = pdfitem.TransactionQueue;
        TransactionQueue.LinkOff = !TransactionQueue.LinkOff;
        debugger;
        fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}/${pdfitem.id}/Transactions/${TransactionQueue.id}`).update(TransactionQueue);
        dispatch({ type: actions.LinkOff, pdfId: pdfitem.id, TransactionQueue: TransactionQueue })
    }
    const ShowTransMenu = (value) => {
        debugger;
        setOpenTransListEl(value.currentTarget);
        setIsMenu(prev => !prev);
    };
    const CloseTransMenu = (tran) => {
        setIsMenu(prev => !prev);
    }
    const SwitchTransac = (tran) => {
        setIsMenu(prev => !prev);
        dispatch({ type: actions.SwitchTransac, pdfId: pdfitem.id, TransactionQueue: tran })
    }
    const openPopover = Boolean(anchorEl);
    return (
        <div className="Recipient">
            {pdfitem.TransactionQueue.SendTo === "" ?
                <div className="SendTo">
                    <IconButton aria-label="delete" className={classes.sendTo} onClick={handleClickOpen}>
                        <ContactMailIcon fontSize="small" />
                    </IconButton>
                </div> :
                <div className="SendTo" style={{ fontSize: '10px' }}>
                    <Fab variant="extended" onClick={() => { dispatch({ type: actions.AssignRecipient }) }} className={classes.recipient}>
                        <ContactMailIcon fontSize="small" className={classes.contactIcon} />
                        {pdfitem.TransactionQueue.SendTo}
                        {pdfitem.TransactionQueue.isLink && pdfitem.TransactionQueue.LinkOff && <LinkOffIcon className={classes.LinkOffIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        {pdfitem.TransactionQueue.isLink && !pdfitem.TransactionQueue.LinkOff && <LinkOutlinedIcon className={classes.LinkOnIcon} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} onClick={LinkOff} />}
                        <Popover className={classes.popover} classes={{ paper: classes.paper, }} open={openPopover} anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            onClose={handlePopoverClose} disableRestoreFocus>
                            {pdfitem.TransactionQueue.LinkOff && <div style={{ fontSize: '10px' }}>Turn Link Off</div>}
                            {!pdfitem.TransactionQueue.LinkOff && <div style={{ fontSize: '10px' }}>Turn Link On</div>}
                        </Popover>
                        <CloseIcon className={classes.closebtn} onClick={clear} />
                    </Fab> + <span aria-haspopup="true" aria-controls="fade-menu" className="MoreRecipientsNumber" onClick={ShowTransMenu}>{pdfitem.Transactions.filter(i => i.SendTo !== "" && i.id !== pdfitem.TransactionQueue.id).length}</span>
                    <Paper className={classes.TransPaper}>
                        <Menu id="fade-menu" anchorEl={openTransListEl} keepMounted open={isMenu} onClose={CloseTransMenu} TransitionComponent={Fade} >
                            {pdfitem.Transactions.filter(i => i.SendTo !== "" && i.id !== pdfitem.TransactionQueue.id).map(trans => {
                                return (
                                    <MenuItem onClick={() => SwitchTransac(trans)} key={`${trans.id}`}>
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp" src="/broken-image.jpg" className={classes.orange}>{trans.SendTo.substring(0, 2)}</Avatar>
                                        </ListItemIcon>
                                        <Typography variant="inherit" className={classes.transMenu}> {trans.SendTo}</Typography>
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </Paper>
                </div>}
            <SimpleDialog selectedValue={pdfitem.TransactionQueue.SendTo} open={open} onClose={handleClose} />
        </div>
    )
}
export default Recipient; 