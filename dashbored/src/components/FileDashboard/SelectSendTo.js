import React, { useContext, useEffect, useCallback } from 'react';
import { db, actions } from '../../Store'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

// const emails = ['Dioscarr@gmail.com', 'DionelRodriguez16@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const { state, dispatch } = useContext(db);
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {

        if (value === "addAccount") {
            dispatch({ type: actions.AddNewAccount, AddNew: true });
            value = "";
        }
        else {
            dispatch({ type: actions.AddNewAccount, AddNew: false });
        }

        onClose(value);



    };



    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Contacts</DialogTitle>
            <List>
                {state.Contacts.map((contact) => (
                    <ListItem button onClick={() => handleListItemClick(contact.email)} key={contact.email}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={contact.email} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const SelectSendTo = () => {
    const { state, dispatch } = useContext(db);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        alert();
        setOpen(false);

        setSelectedValue(value);
    };

    return (
        <div>
            <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
      </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}
export { SelectSendTo, SimpleDialog }