import React, { useContext, useEffect, useState } from 'react';
import { db, actions } from '../../Store'
import { fdb, fstorage } from '../../API/firebase';
import FileUpload from '../Upload/FileUpload';
import Recipient from '../FileDashboard/Recipient'
import "./Dashbrd.scss";
import useViewport from '../../hooks/useViewport'
import useForm from '../../hooks/useForm'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import SendFile from '../FileDashboard/SendFile'
import FileSettings from '../FileDashboard/FileSettings'
import { green } from '@material-ui/core/colors';
import DashbrdStyles from './DashbrdStyles'
function Dashbrd(props) {
  const { user, state, dispatch } = props
  const { width } = useViewport();
  const removepdf = (id, filename) => {
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${id}/`).remove();

    fstorage.ref(`pdfs/${id}/`).delete();
    fstorage.ref().child(`pdfs/${id}/`).delete();
  }
  useEffect(() => {
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`).once("value", children => {
      if (!state.fdbInitialized) {
        dispatch({ type: actions.fdbInitialized });
        const pdfs = [];
        children.forEach(item => {
          const Trans = [];
          let Queue = item.val().TransactionQueue;
          Object.keys(item.val().Transactions).forEach(key => Trans.push(item.val().Transactions[key]));
          if (Trans.length > 0) {
            Trans.forEach(i => {
              if (i.SendTo !== "") {
                Queue = i;
                return;
              }
            });
          }
          pdfs.push({
            name: item.val().name,
            createdAt: item.val().createdAt,
            id: item.key,
            downloadUrl: item.val().downloadUrl,
            size: item.val().size,
            SendTo: "",
            Transactions: Trans,
            TransactionQueue: Queue
          })
        });
        dispatch({ type: actions.SetPdfs, pdfs: pdfs, Loading: false });
      }
    });
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`)
      .on("child_removed", child => {
        console.log("fdb child_removed")
        dispatch({ type: actions.DeletePdf, pdfKey: child.key });
      });
  }, []);

  const classes = DashbrdStyles();
  return (
    <div className="Dashbrd">
      <div><FileUpload /></div>
      <div>      <div className="files">
        <div className="file-header">
          <div className="header-title">Title</div>
          <div className="header-date"></div>
        </div>
        {<div className="file-rows">
          {state.pdfs.map((pdfitem, key) => {
            return (
              <div key={key} className="the-file-row">
                <SendFile classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                <Recipient classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} fdb={fdb} />
                <div className="the-file-date">
                  {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
                </div>
                <div className="settings-pdfs-list">
                  <FileSettings classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                  <div>
                    <IconButton aria-label="delete" className={classes.margin} onClick={e => removepdf(pdfitem.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </div>);
          })}
        </div>
        }
      </div>
      </div>
    </div>
  );
}

export default Dashbrd;