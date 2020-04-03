import React,{useState,useContext} from 'react'
import {fdb, fstorage} from '../API/firebase'
import { db, actions } from '../Store'
import useForm from '../hooks/useForm';
import "./FileUpload.scss";

const FileUpload = ()=>
{
    const {state, dispatch} = useContext(db);
    const [image, setImage] = useState(null);
    const [fields, setFields,reset] = useForm({pdfname:''});
    const [dragging, setDragging] = useState(false);
    const [draggingOver, setdraggingOver] = useState(false);
    const [dropit, setDropit] = useState(false);
    const hchange=e=>
    {
        const upimage =  e.target.files[0];
        setImage(upimage);
    }
    const up = e=>
    {
        debugger;
        const key = fdb.ref(`pdfs/${state.CurrentUser.email.replace(".","")}/`).push().key;
        const uploadTask =  fstorage.ref(`pdfs/${key}`).put(image);
        uploadTask.on('state_changed', progress=>{
        }, err=>{
        }, complete=>{
            fstorage.ref("pdfs").child(key).getDownloadURL().then(url=>{
                const pdf= {
                        id:key,
                        name: fields.pdfname,
                        createdAt: Date.now(),
                        downloadUrl:url
                }
                fdb.ref(`pdfs/${state.CurrentUser.email.replace(".","")}/${key}`).update(pdf);
                dispatch({type:actions.AddPdf,pdf:pdf});
            })
        });
        reset({pdfname:'',Uploader:''});

        setDropit(false);
        setDragging(false)
        setdraggingOver(false)
        image.value = null;
    }
    const handleDrop = e=>{
      setDropit(true);
      setdraggingOver(false)
    }
    const handleDragEnter = e=>{
        setDragging(true)
    }
    const handleDragOver = e=>{
        setdraggingOver(true)
    }
    const handleDragLeave = e=>{
        setDragging(true)
        setdraggingOver(false)
    }

    return(
        <div className="fileUpload form-inline " data-file={(fields.pdfname ==="" && !dragging)?"no-file":"file"}>
            <div><input type="text" name="pdfname"   placeholder="Title" value={fields.pdfname} onChange={setFields}
            /></div>
            {(dragging )&&(<div className="FileDropOverlay"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            >
                {(draggingOver)?(<div className="DraggingOverContent">Drop it!</div>):(<div className="DraggingOverContent">
                   {(dropit && fields.image!==null)? (<div>{`${fields.pdfname===""?'WhatismynameBitch':fields.pdfname}.pdf`}</div>):(<div>Teasing me</div>)}
                    </div>)}
                </div>)}
            <div><input type="file"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            id="item-drop" onChange={hchange} /></div>
            <div className="upload-pdf">
                {(fields.pdfname!=="" && image !==null)&&(<button type="button" id="righ-col" onClick={up}>Upload</button>)}
                {(fields.pdfname ==="" || image=== null)&&(<button style={{backgroundColor:'#80808087'}} disabled type="button" id="righ-col" onClick={up}>Upload</button>)}
                </div>
        </div>
    );
}


export default FileUpload;