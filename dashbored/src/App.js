import React, {useReducer, useEffect} from 'react';
import { storeReducer, data, db, actions } from './Store'
import logo from './logo.svg';
import './App.css';
import Dashbrd from './Dashbrd'
import {fdb,fstorage} from './API/firebase';




function App() {
  const [state, dispatch] = useReducer(storeReducer, data);

    //firebase.ref("pdflist").push(pdf);

    // useEffect(() => {
    //   const PEvents = snapshot => {
    //       const pdfs = [];
    //       snapshot.forEach(function (data) {
    //           pdfs.push(data.val());
    //       });
    //       dispatch({type:actions.SetPdfs, pdfs:pdfs, Loading:false});

    //   }
    //   fdb.ref("pdflist").on("value", PEvents);
    // },[dispatch]);


useEffect(()=>{
  debugger;
  fdb.ref("pdfs").on("value",children=>
  {
    debugger;
    const pdfs = [];
    children.forEach(child=>{

      console.log("new child" + child.key);
      const pdf = {
        name: child.val().name,
        uploadedBy: child.val().uploadedBy,
        createdAt: child.val().createdAt
    }

    pdfs.push(pdf);
    fstorage.ref("pdfs").child(child.key).getDownloadURL().then(url=>{
      debugger;
        pdf.downloadUrl=url;
        pdf.id = child.key;
        dispatch({type:actions.AddPdf,pdf:pdf, Loading:false});
      });
    });
});
},[])
useEffect(
  ()=>
  {
    fdb.ref("pdfs")
    .on("child_removed",child=>
    {
      dispatch({type:actions.DeletePdf,pdfKey:child.key});
    });
},[]);

  return (
    <db.Provider value={{ state, dispatch }}>
    <div className="App">
    <Dashbrd />
    </div>
    </db.Provider>
  );
}

export default App;
