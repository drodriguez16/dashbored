import React, {useReducer, useEffect,useState} from 'react';
import { storeReducer, data, db, actions } from './Store'
import logo from './logo.svg';
import './App.scss';
import Dashbrd from './Dashbrd'
import {fdb,fstorage} from './API/firebase';
import Logo from './assets/logo.svg'
import useViewport from './hooks/useViewport'

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

  useEffect(()=>{
    fdb.ref("pdfs").once("value",children=>{
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
  },[]);

  useEffect(()=>{
    fdb.ref("pdfs")
    .on("child_removed",child=>{
      console.log("fdb child_removed")
      dispatch({type:actions.DeletePdf,pdfKey:child.key});
    });
  },[]);

  return (
    <db.Provider value={{ state, dispatch }}>
    <div className="Sender-Render" data-theme={theme}>
        <div className="Logo-Section">
            <img src={Logo} />
        </div>
    <Dashbrd />
    </div>
    </db.Provider>
  );
}

export default App;
