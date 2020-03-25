import React, {useReducer, useEffect} from 'react';
import { storeReducer, data, db, actions } from './Store'
import logo from './logo.svg';
import './App.css';
import Dashbrd from './Dashbrd'
import {fdb,fstorage} from './API/firebase';

const pdf = {
  name: "testfile",
  uploadedBy: "John",
  createdAt: Date.now()
}



function App() {
  const [state, dispatch] = useReducer(storeReducer, data)
    //firebase.ref("pdflist").push(pdf);

    useEffect(() => {
      const PEvents = snapshot => {
          const pdfs = [];
          snapshot.forEach(function (data) {
              pdfs.push(data.val());
          });
          dispatch({type:actions.SetPdfs, pdfs:pdfs, Loading:false});
        debugger;
      }
      fdb.ref("pdflist").on("value", PEvents);
    },[dispatch]);

  return (
    <db.Provider value={{ state, dispatch }}>
    <div className="App">
     {(state.Loading)?(<>Loading...</>):(<Dashbrd />)}
    </div>
    </db.Provider>
  );
}

export default App;
