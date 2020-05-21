import React, { useContext, useEffect, useState } from 'react';
import { db, actions } from '../../Store'
import { fdb, fstorage, messaging } from '../../API/firebase';
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
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ReactComponent as Byrdlogo } from '../../assets/Byrd.svg'
import Nofitication from '../Notification'

const servId = "AAAAQ7h9wjc:APA91bEzr1ut4NE1Vhndclw0MuD7WrbKIf1_Q2sJpx246FUm4AQC4uQlqNpcokTNfhaMUBpVtLI6lUbJ8g5ljsOtvhiOm9Bzq-nP9sb16qf5FppbANBTV6vJFXVfsN7tVmQVx06U6IXE";

function Dashbrd(props) {
  const { user, state, dispatch } = props
  const [page, SetPage] = useState(0)
  const { width } = useViewport();
  const removepdf = (id, filetype) => {
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/${filetype}/${id}/`).remove();
    fstorage.ref(`pdfs/${id}/`).delete();
    // fstorage.ref().child(`pdfs/${id}/`).delete();
  }

  useEffect(() => {
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        fdb.ref(`Accounts/${state.CurrentUser.email.toLowerCase().replace(".", "")}/Devices/`).update({ deviceTk: token });
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
    // fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/Devices/`).once("value", children => {
    //   const token = children.val().deviceTk;
    //   const mode = "cors";
    //   const method = "POST"
    //   const headers = {
    //     "authorization": `key=${servId}`,
    //     "content-type": "application/json"
    //   }
    //   const notification = {
    //     "body": "",
    //     "title": "File brought to you by FileByrd",
    //     "icon": "https://user-images.githubusercontent.com/6876354/82510739-5140bf80-9ad9-11ea-8a15-f3194894b39b.png"
    //   }
    //   const data = {
    //     "body": "Body of Your Notification in Data",
    //     "title": "Title of Your Notification in Title",
    //     "key_1": "Value for key_1",
    //     "key_2": "Value for key_2"
    //   }
    //   const body = {
    //     "collapse_key": "type_a",
    //     "notification": notification,
    //     "data": data,
    //     "to": `${token}`
    //   }
    //   const notif = {
    //     "mode": mode,
    //     "method": method,
    //     "headers": headers,
    //     "body": JSON.stringify(body)
    //   }

    //   fetch("https://fcm.googleapis.com/fcm/send", notif)
    //     .then(response => {
    //       
    //       response.json()
    //     })
    //     .then(data => {
    //       debugger
    //       console.log(data)
    //     });
    // });

    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`).on("value", children => {
      if (!state.fdbInitialized) {
        dispatch({ type: actions.fdbInitialized });
        const pdfs = [];
        children.forEach(item => {
          const Trans = [];
          let Queue = item.val().TransactionQueue;

          if (item.val()?.Transactions !== null) {
            Object.keys(item.val().Transactions).forEach(key => Trans.push(item.val().Transactions[key]));
          }
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
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/filebyrd/`).on("value", children => {
      if (!state.fdbInitialized) {
        dispatch({ type: actions.fdbInitialized });

        const pdfs = [];
        children.forEach(item => {
          const Trans = [];
          let Queue = item.val().TransactionQueue;
          if (item.val()?.Transactions !== null) {
            Object.keys(item.val().Transactions).forEach(key => Trans.push(item.val().Transactions[key]));
          }
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

        dispatch({ type: actions.Setfilebyrd, filebyrd: pdfs });
      }
    });
    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`)
      .on("child_removed", child => {
        console.log("fdb child_removed")
        dispatch({ type: actions.DeletePdf, pdfKey: child.key });
      });
  }, []);
  const onTabChange = (e, index) => {
    SetPage(index)
    dispatch({ type: actions.ActiveQueue, currentPage: (index) })
  }
  const onPageIndexChange = index => {
    SetPage(index)
    dispatch({ type: actions.ActiveQueue, currentPage: (index) })
  }
  const classes = DashbrdStyles();
  return (
    <div className="Dashbrd">
      <div><FileUpload /></div>
      <div className="files-box">
        <div className="files">
          <div className="file-header">
            <div className="header-title">Title</div>
            <div className="header-date"></div>
          </div>
          {<div className="file-rows">
            <SwipeableViews index={page} onChangeIndex={onPageIndexChange} className="spview">
              <div className="sent-files">
                {state.pdfs.map((pdfitem, key) => {
                  return (
                    <div key={key} >
                      <div className="the-file-row">
                        <SendFile direction="outbox" classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                        <Recipient direction="outbox" classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} fdb={fdb} />
                        <div className="the-file-date">
                          {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
                        </div>
                        <div className="the-file-delete">
                          {/* <FileSettings classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} /> */}
                          {/* <div> */}
                          <IconButton aria-label="delete" className={classes.margin} onClick={e => removepdf(pdfitem.id, "pdfs")}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>);
                })}
              </div>
              <div>
                {state.filebyrd.map((pdfitem, key) => {

                  return (
                    <div key={key} >
                      <div className="the-file-row">
                        <SendFile direction="inbox" classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} />
                        <Recipient direction="inbox" classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} fdb={fdb} />
                        <div className="the-file-date">
                          {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
                        </div>
                        <div className="the-file-delete" >
                          {/* <FileSettings classes={classes} state={state} dispatch={dispatch} actions={actions} pdfitem={pdfitem} /> */}
                          {/* <div> */}
                          <IconButton aria-label="delete" className={classes.margin} onClick={e => removepdf(pdfitem.id, "filebyrd")}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>);
                })}
              </div>
            </SwipeableViews>
            <Tabs value={page} onChange={onTabChange} className="queue-tabs" >
              <Tab label={<div><Byrdlogo style={{ height: '30px' }} /><div>FilesSent </div></div>} />
              <Tab label={<div><Byrdlogo style={{ height: '30px' }} /><div>FileByrd</div></div>} />
            </Tabs>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Dashbrd;