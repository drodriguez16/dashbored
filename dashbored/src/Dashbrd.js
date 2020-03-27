import React, {useContext,useEffect} from 'react';
import {db, actions } from './Store'
import {fdb,fstorage} from './API/firebase';
import FileUpload from './components/FileUpload';
import "./Dashbrd.css";


function Dashbrd() {

const {state, dispatch} = useContext(db);

const removepdf = (id)=>
{
  alert(id);
  fdb.ref(`pdfs/${id}`).remove();
  fstorage.ref(`pdfs/${id}`).delete();
}

  return (
      <div className="Sender-Component">
        <div className="Sender-Row">
          <FileUpload className="Sender-Column"/>
              <div className=" Sender-Column ListOfFiles">
              {

                  state.pdfs.map((pdfitem,key) =>
                  {
                    debugger
                  return(<div key={key}><a href={`${pdfitem.downloadUrl}`} download>{pdfitem.name}</a><button onClick={e=>removepdf(pdfitem.id)}>Delete</button></div>);
                  })

                }
                </div>
        </div>
      </div>

  );
}

export default Dashbrd;
