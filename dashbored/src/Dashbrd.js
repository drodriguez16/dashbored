import React, {useContext,useEffect} from 'react';
import {db, actions } from './Store'
import {fdb,fstorage} from './API/firebase';
import FileUpload from './components/FileUpload';
import "./Dashbrd.scss";


function Dashbrd() {

const {state, dispatch} = useContext(db);

const removepdf = (id)=>
{
  alert(id);
  fdb.ref(`pdfs/${id}`).remove();
  fstorage.ref(`pdfs/${id}`).delete();
}

  return (
      <div className="Sender-Component Dashbrd">
          <FileUpload />
            <div className="files">
            {
                <div className="file-header">
                  <div className="header-title">Title</div>
                  <div className="header-date">Date</div>
                </div>
            }
            {
              <div>
                {
                  state.pdfs.map((pdfitem,key) =>
                  {

                  return(
                    <div key={key} className="the-file-row">
                        <div className="the-file" >
                          <a href={`${pdfitem.downloadUrl}`}  download>{pdfitem.name}</a>
                        </div>
                        <div className="the-file-send">
                        <button>Send</button>
                        </div>
                        <div className="the-file-date">
                          {new Date(pdfitem.createdAt).toLocaleString()}
                        </div>
                        <div className="the-file-delete">
                          <button onClick={e=>removepdf(pdfitem.id)}>Delete</button>
                        </div>
                        </div>);
                  })
                }
                </div>

              }
              </div>

      </div>

  );
}

export default Dashbrd;
