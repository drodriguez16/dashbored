import React, {useContext,useEffect, useState} from 'react';
import {db, actions } from './Store'
import {fdb,fstorage} from './API/firebase';
import FileUpload from './components/FileUpload';
import "./Dashbrd.scss";
import useViewport from './hooks/useViewport'


function Dashbrd() {

const {state, dispatch} = useContext(db);
const [color, setColor] = useState('transparent')
const {width} = useViewport();
const removepdf = (id)=>
{

  fdb.ref(`pdfs/${id}`).remove();
  fstorage.ref(`pdfs/${id}`).delete();
}

  return (
      <div className="Sender-Component Dashbrd">
          <FileUpload />
            <div className="files">
            {(width>620)&&(
                <div className="file-header">
                  <div className="header-title">Title</div>
                  <div className="header-date">Date</div>
                </div>)
            }
            {
              <div className="file-rows">
                {
                  state.pdfs.map((pdfitem,key) =>
                  {
                    return(
                      <div key={key} className="the-file-row">
                          {(width<620)&&(<div className="mobile-header-title">Title</div>)}
                          <div className="the-file" >
                            <a href={`${pdfitem.downloadUrl}`} rel="noopener noreferrer" target="_blank"  download={`${pdfitem.name}.pdf`}>{`${pdfitem.name}.pdf`}</a>
                          </div>
                          <div className="the-file-send">
                          <button>Send</button>
                          </div>
                          {(width<620)&&(<div className="mobile-header-date">Date</div>)}
                          <div className="the-file-date">
                            {new Date(pdfitem.createdAt).toLocaleDateString('en-US')}
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
