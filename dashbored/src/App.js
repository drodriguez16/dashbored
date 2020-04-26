import React, { useReducer, useEffect, useState } from 'react';
import { storeReducer, data, db, actions, fauth } from './Store'
import './App.scss';
import Dashbrd from './Dashbrd'
import { fdb, fstorage } from './API/firebase';
import useViewport from './hooks/useViewport'
import LoginForm from './components/LoginForm';
import Setting from './components/Settings'
import HeaderAuthIn from './components/HeaderAuthIn'
import HeaderAuthOut from './components/HeaderAuthOut'
// import SelectSendTo from './components/SelectSendTo'

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
        if (user != null) {
          dispatch({ type: actions.SetCurrentUser, CurrentUser: { email: user.email } });
          dispatch({ type: actions.SignedIn });
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.photoURL);
          console.log(user.emailVerified);
          console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          fdb.ref(`pdfs/${user.email.replace(".", "")}`).once("value", children => {
            if (!state.fdbInitialized) {
              dispatch({ type: actions.fdbInitialized });
              const pdfs = [];

              children.forEach(item => {
                pdfs.push({
                  name: item.val().name,
                  createdAt: item.val().createdAt,
                  id: item.key,
                  downloadUrl: item.val().downloadUrl,
                  size: item.val().size
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
      fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}`).once("value", children => {
        if (!state.fdbInitialized) {
          dispatch({ type: actions.fdbInitialized });
          const pdfs = [];

          children.forEach(item => {
            pdfs.push({
              name: item.val().name,
              createdAt: item.val().createdAt,
              id: item.key,
              downloadUrl: item.val().downloadUrl,
              size: item.val().size
            })
          });
          dispatch({ type: actions.SetPdfs, pdfs: pdfs, Loading: false });
        }
      });
      fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}`)
        .on("child_removed", child => {
          console.log("fdb child_removed")
          dispatch({ type: actions.DeletePdf, pdfKey: child.key });
        });
    }
  }, [state.SignedIn]);

  return (
    <db.Provider value={{ state, dispatch }}>
      {(!state.SignedIn) && (
        <div className="LoggedOut" data-theme={theme} >
          <HeaderAuthOut />
          <LoginForm />
        </div>)}
      {(state.SignedIn) && (
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
