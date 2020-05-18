import React, { useReducer, useEffect, useState } from 'react';
import { storeReducer, data, db, actions, fauth, documents } from './Store'
import './App.scss';
import Dashbrd from './components/Main/Dashbrd'
import { fdb, fstorage } from './API/firebase';
import useViewport from './hooks/useViewport'
import LoginForm from './components/LogIn/LoginForm';
import Setting from './components/Header/Settings'
import HeaderAuthIn from './components/Header/HeaderAuthIn'
import HeaderAuthOut from './components/LogIn/HeaderAuthOut'
import { useIsFocusVisible } from '@material-ui/core';

function App() {
  const [state, dispatch] = useReducer(storeReducer, data);
  const { width } = useViewport();
  const [theme, setTheme] = useState("web-large")
  useEffect(() => {
    if (width < 620) {
      setTheme('mobile')
    }
    else {
      setTheme('web-large')
    }
  }, [width]);
  useEffect(() => {
    fauth.onAuthStateChanged(function (user) {

      if (user) {
        fdb.ref(("/")).once("value", cb => {
          debugger;
          if (cb.val() === null) {
            fdb.ref((documents.settings(user))).set(state.Settings)

            // fdb.ref(documents.contactBook(user)).push({ email: user.email })
          }
          else {
            fdb.ref((documents.settings(user))).once("value", cb => {
              const settings = cb.val();
              if (settings != null)
                dispatch({ type: actions.SetSettings, settings: settings })
            })

            fdb.ref((documents.contactBook(user))).once("value", cb => {
              const contactBook = [];
              cb.forEach(item => contactBook.push(item.val()))
              dispatch({ type: actions.SetContacts, Contacts: contactBook })
            })
          }
        });
        if (user != null) {
          dispatch({ type: actions.SetCurrentUser, CurrentUser: { email: user.email } });
          dispatch({ type: actions.SignedIn });
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.photoURL);
          console.log(user.emailVerified);
          console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
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
        }
        console.log("user signed in")
      } else {
        dispatch({ type: actions.SetPdfs, pdfs: [], Loading: false });
        dispatch({ type: actions.LogOut });
        console.log("No user signed in")
      }
    });
  }, []);

  useEffect(() => {
    if (state.SignedIn) {
      fdb.ref(("/")).once("value", cb => {
        debugger;
        if (cb.val() === null) {
          fdb.ref((documents.settings(state.CurrentUser))).set(state.Settings)
          fdb.ref(documents.contactBook(state.CurrentUser)).set({ email: state.CurrentUser.email })
        } else {
          fdb.ref((documents.settings(state.CurrentUser))).once("value", cb => {
            const settings = cb.val();
            if (settings != null)
              dispatch({ type: actions.SetSettings, settings: settings })

            fdb.ref((documents.contactBook(state.CurrentUser))).once("value", cb => {
              const contactBook = [];
              cb.forEach(item => contactBook.push(item.val()))
              dispatch({ type: actions.SetContacts, Contacts: contactBook })
            })

          })
        }
      })

      fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`).once("value", children => {
        if (!state.fdbInitialized) {
          dispatch({ type: actions.fdbInitialized });
          const pdfs = [];

          children.forEach(item => {
            const Trans = [];
            let Queue = item.val().TransactionQueue;
            debugger;
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
    }
  }, [state.SignedIn]);
  debugger;
  return (
    <db.Provider value={{ state, dispatch }}>
      {state.Settings?.isSettings !== null && (!state.SignedIn) && (
        <div className="LoggedOut" data-theme={theme} >
          <HeaderAuthOut />
          <LoginForm />
        </div>)}
      {state.Settings?.isSettings !== null && (state.SignedIn) && (
        <div className="Sender-Render" data-theme={theme}>
          <HeaderAuthIn />
          {state.Settings.isSettings ? (<><Setting /></>) :
            (<>
              <Dashbrd />
              {/* <SelectSendTo /> */}
            </>)}
        </div>)}
    </db.Provider>
  );
}

export default App;
