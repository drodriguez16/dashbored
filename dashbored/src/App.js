import React, {useReducer, useEffect,useState} from 'react';
import { storeReducer, data, db, actions, fauth } from './Store'
import logo from './logo.svg';
import './App.scss';
import Dashbrd from './Dashbrd'
import {fdb,fstorage} from './API/firebase';
import Logo from './assets/logo.svg'
import useViewport from './hooks/useViewport'
import LoginForm from './components/LoginForm';
import logout from './img/logout.png'


function App() {
  const [state, dispatch] = useReducer(storeReducer, data);
  const {width} = useViewport();
  const [theme, setTheme] = useState("web-large")


  useEffect(()=>{
    if(width<620){
      setTheme('mobile')
    }
    else{
      setTheme('web-large')
    }
  },[width]);

  const signout = ()=>
  {
    fauth.signOut();
  }

  useEffect(()=>{
    fauth.onAuthStateChanged(function(user) {
      if (user) {
        if (user != null) {

          debugger;
          dispatch({type:actions.SetCurrentUser,CurrentUser:{email:user.email}});
          dispatch({type:actions.SignedIn});
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.photoURL);
          console.log(user.emailVerified);
          console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if


                           fdb.ref(`pdfs/${user.email.replace(".","")}`).once("value",children=>{
                            if(!state.fdbInitialized){
                              dispatch({type:actions.fdbInitialized});
                              const pdfs = [];
                              children.forEach(item=> {
                                pdfs.push({
                                  name: item.val().name,
                                  createdAt: item.val().createdAt,
                                  id:item.key,
                                  downloadUrl:item.val().downloadUrl
                                })
                              });
                              dispatch({type:actions.SetPdfs,pdfs:pdfs, Loading:false});
                            }
                          });
        }
        console.log("user signed in")
      } else {
        dispatch({type:actions.SetPdfs,pdfs:[], Loading:false});
        dispatch({type:actions.LogOut});



        console.log("No user signed in")
      }
    });
  },[]);

  useEffect(()=>{
    if(state.SignedIn)
    {
      debugger;
        fdb.ref(`pdfs/${state.CurrentUser.email.replace(".","")}`).once("value",children=>{
        if(!state.fdbInitialized){
          dispatch({type:actions.fdbInitialized});
          const pdfs = [];
          children.forEach(item=> {
            pdfs.push({
              name: item.val().name,
              createdAt: item.val().createdAt,
              id:item.key,
              downloadUrl:item.val().downloadUrl
            })
          });
          dispatch({type:actions.SetPdfs,pdfs:pdfs, Loading:false});
        }
      });
      fdb.ref(`pdfs/${state.CurrentUser.email.replace(".","")}`)
      .on("child_removed",child=>{
        console.log("fdb child_removed")
        dispatch({type:actions.DeletePdf,pdfKey:child.key});
      });
    }
  },[state.SignedIn]);



  return (

      <db.Provider value={{ state, dispatch }}>

        {(!state.SignedIn)&&(
        <div className="LoggedOut" data-theme={theme} >
          <div className="Logo-Section">
            <img src={Logo}  Style="grid-column:1/4; height: 140px;"  alt=""/>
          </div>
          <LoginForm />
        </div>)}
        {  (state.SignedIn)&&(
          <div className="Sender-Render" data-theme={theme}>
            <div className="Logo-Section">
                <img src={Logo} alt="" />
                <img className="logout" src={logout}  alt="" onClick={signout} />
            </div>
            <Dashbrd />
        </div>)
      }

      </db.Provider>

  );
}

export default App;
