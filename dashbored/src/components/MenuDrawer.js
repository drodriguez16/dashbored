import React, { useContext, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TimelineIcon from '@material-ui/icons/Timeline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';

import { db, actions } from '../Store'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const { state, dispatch } = useContext(db);

    const classes = useStyles();
    const [menuState, setmenuState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setmenuState({ ...menuState, [anchor]: open });
    };
    useEffect(() => {
        setmenuState({ ...menuState, 'right': true });
    }, [state.PdfSettings.isSettings])

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {/* {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
                <ListItem button >
                    <ListItemIcon><TimelineIcon /></ListItemIcon>
                    <ListItemText primary={'History'} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText primary={'Exp: Tue: 12:30 PM'} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon><EventAvailableIcon /></ListItemIcon>
                    <ListItemText primary={'Sun: 12:30 PM'} />
                </ListItem>
                <ListItem button >
                    <ListItemIcon><EventBusyIcon /></ListItemIcon>
                    <ListItemText primary={'Cancelled: Epx: Mon'} />
                </ListItem>
                {/* ))} */}
            </List>
        </div>
    );

    return (
        <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>

                    <SwipeableDrawer
                        anchor={anchor}
                        open={menuState[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
