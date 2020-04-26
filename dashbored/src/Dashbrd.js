import React, { useContext, useEffect, useState } from 'react';
import { db, actions } from './Store'
import { fdb, fstorage } from './API/firebase';
import FileUpload from './components/FileUpload';
import Recipient from './components/Recipient'
import "./Dashbrd.scss";
import useViewport from './hooks/useViewport'
import useForm from './hooks/useForm'

import SwipeableTemporaryDrawer from './components/MenuDrawer'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';


const cloudFuncSendEmail = "https://us-central1-dashbrd-152dc.cloudfunctions.net/sendMail?";

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
    outline: '1px solid #fbfbfb'
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
}));

function Dashbrd() {

  const { state, dispatch } = useContext(db);
  const [color, setColor] = useState('transparent')
  const [fields, setFields] = useForm({ sendTo: '' })
  const { width } = useViewport();
  const removepdf = (id) => {

    fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}/${id}`).remove();
  }

  const sendLink = ({ To, fileLink, fileName, size }) => {
    if (To.indexOf("@") !== -1) {

      const url = `${cloudFuncSendEmail}dest=${To}&downloadlink=${fileLink}&useremail=${state.CurrentUser.email}&sendername=${state.Settings.fullname}&fileName=${fileName}&size=${size}`;
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.send()
    }
  }
  const classes = useStyles();
  return (
    <div className="Sender-Component Dashbrd">
      <SwipeableTemporaryDrawer />
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
                    <div className="the-file" >
                      <div className="SendTo">
                        <IconButton aria-label="delete" className={classes.send} onClick={() => { sendLink({ To: fields.sendTo, fileLink: pdfitem.downloadUrl, fileName: pdfitem.name, size: pdfitem.size }) }}>
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <a href={`${pdfitem.downloadUrl}`} rel="noopener noreferrer" target="_blank" download={`${pdfitem.name}.pdf`}>{`${pdfitem.name}.pdf`}</a>
                    </div>
                    {/* <div className="the-file-send" >
                      {state.PdfSettings.AssignRecipient ?
                        <div className="SendTo">
                          <IconButton aria-label="delete" className={classes.sendTo} onClick={() => { dispatch({ type: actions.AssignRecipient }) }}>
                            <ContactMailIcon fontSize="small" />
                          </IconButton>
                        </div> :
                        <div className="SendTo" style={{ fontSize: '10px' }}>

                          <Fab variant="extended" onClick={() => { dispatch({ type: actions.AssignRecipient }) }} className={classes.recipient}>
                            <ContactMailIcon fontSize="small" className={classes.contactIcon} />   {state.PdfSettings.Recipient} <CloseIcon className={classes.closebtn} />
                          </Fab>
                        </div>}
                    </div> */}
                    <Recipient classes={classes} state={state} dispatch={dispatch} actions={actions} />
                    {(width < 620) && (<div className="mobile-header-date"></div>)}
                    <div className="the-file-date">
                      {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
                    </div>
                    <div className="the-file-delete settings-pdfs-list">

                      <div>
                        <IconButton aria-label="delete" className={classes.margin} onClick={e => dispatch({ type: actions.isPdfSettings })}>
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </div>
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