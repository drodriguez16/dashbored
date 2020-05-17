import React, { useContext, useEffect, useState } from 'react';
import { db, actions } from './Store'
import { fdb, fstorage } from './API/firebase';
import FileUpload from './components/FileUpload';
import Recipient from './components/Recipient'
import "./Dashbrd.scss";
import useViewport from './hooks/useViewport'
import useForm from './hooks/useForm'


import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';

import SendFile from './components/SendFile'
import FileSettings from './components/FileSettings'
import { green } from '@material-ui/core/colors';






const useStyles = makeStyles((theme) => ({
  send: { color: '#2391e9', margin: theme.spacing(1) },
  sendTo: { color: '#000000', margin: theme.spacing(1) },
  recipient:
  {
    padding: '3px 15px',
    fontSize: '10px',
    height: '28px',
    backgroundColor: 'white',
    color: '#0068a9',
    boxShadow: '0px 1px 4px -2px #383838'
  },
  closebtn: {
    color: 'red',
    marginLeft: '2px',
    fontSize: '16px',

  },
  contactIcon: {
    color: '#bfbfbf',
    marginRight: '5px',
    fontSize: '17px'
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fabProgress: {
    color: '#0091ea',
    position: 'absolute',
    left: '7px',

    zIndex: 1,
  },
  LinkOffIcon: {
    marginLeft: '4px',
    color: '#FF9800'
  },
  LinkOnIcon: {
    marginLeft: '4px',
    color: 'green'
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  TransPaper: {
    width: 230,
  },
  orange: {
    backgroundColor: 'orange'
  },
  transMenu: {
    fontSize: '12px'
  }
}));

function Dashbrd() {

  const { state, dispatch } = useContext(db);
  const [color, setColor] = useState('transparent')

  const { width } = useViewport();
  const removepdf = (id, filename) => {

    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${id}/`).remove();

    fstorage.ref(`pdfs/${id}/`).delete();
    fstorage.ref().child(`pdfs/${id}/`).delete();
  }


  const classes = useStyles();
  return (
    <div className="Sender-Component Dashbrd">
      <FileUpload />
      <div className="files">
        {(width > 620) && (
          <div className="file-header">
            <div className="header-title">Title</div>
            <div className="header-date"></div>
          </div>)
        }
        {
          <div className="file-rows">
            {
              state.pdfs.map((pdfitem, key) => {
                return (
                  <div key={key} className="the-file-row">
                    {(width < 620) && (<div className="mobile-header-title">My Files</div>)}
                    <SendFile classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                    <Recipient classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} fdb={fdb} />
                    {(width < 620) && (<div className="mobile-header-date"></div>)}
                    <div className="the-file-date">
                      {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
                    </div>
                    <div className="the-file-delete settings-pdfs-list">
                      <FileSettings classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                      <div>
                        <IconButton aria-label="delete" className={classes.margin} onClick={e => removepdf(pdfitem.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>

                    </div>

                  </div>);

              })
            }
          </div>
        }
      </div>

    </div>
  );
}

export default Dashbrd;


//<input type="text" name="sendTo" onChange={setFields} value={fields.sendTo} />