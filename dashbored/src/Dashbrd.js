import React, {useContext, useEffect} from 'react';
import { storeReducer, data, db, actions } from './Store'
import {fdb,fstorage} from './API/firebase';

const pdf = {
  name: "testfile",
  uploadedBy: "John",
  createdAt: Date.now()
}



function Dashbrd() {

const {state, dispatch} = useContext(db);

  //firebase.ref("pdflist").push(pdf);



  return (

      <header className="App-header">
         {state.pdfs.map(pdfitem => pdfitem.name)}
      </header>

  );
}

export default Dashbrd;
