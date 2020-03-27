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

if(width<620)
{
  setTheme('mobile')
}
else
{
  setTheme('web-large')
}

},[width]);


useEffect(()=>{
  debugger;
  fdb.ref("pdfs").on("value",children=>
  {
    const pdfs = [];
    children.forEach(child=>{

      console.log("new child" + child.key);
      const pdf = {
        name: child.val().name,
        createdAt: child.val().createdAt
    }

    pdfs.push(pdf);
    fstorage.ref("pdfs").child(child.key).getDownloadURL().then(url=>{
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
