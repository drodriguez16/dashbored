import React, {useContext,useEffect, useState} from 'react';
import {db, actions } from './Store'
import {fdb,fstorage} from './API/firebase';
import FileUpload from './components/FileUpload';
import "./Dashbrd.scss";


function Dashbrd() {

const {state, dispatch} = useContext(db);
const [color, setColor] = useState('transparent')

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
              <div className="file-rows">
                {
                  state.pdfs.map((pdfitem,key) =>
                  {

                  return(
                    <div key={key} className="the-file-row">
                        <div className="the-file" >
                          <a href={`${pdfitem.downloadUrl}`}  download={`${pdfitem.name}.pdf`}>{pdfitem.name}</a>
                        </div>
                        <div className="the-file-send">
                        <button>Send</button>
                        </div>
                        <div className="the-file-date">
                          {new Date(pdfitem.createdAt).toLocaleString()}
                        </div>
                        <div className="the-file-delete">
                          <button onClick={e=>removepdf(pdfitem.id)} >
                            <div  onMouseEnter={() => setColor('transparent')}  onMouseLeave={() => setColor('transparent')} style={{backgroundColor:`${color}`}}></div>
                            <div onMouseEnter={() => setColor('transparent')}  onMouseLeave={() => setColor('transparent')} style={{backgroundColor:`${color}`}}>X</div>
                            </button>
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
