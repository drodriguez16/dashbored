import React,{useState,useContext} from 'react'
import {fdb, fstorage} from '../API/firebase'
import { db, actions } from '../Store'
import useForm from '../hooks/useForm';
import "./FileUpload.css";

const FileUpload = ()=>
{
    const {state, dispatch} = useContext(db);
    const [image, setImage] = useState(null);
    const [fields, setFields,reset] = useForm({pdfname:''});

    const hchange=e=>
    {
        const upimage =  e.target.files[0];
        setImage(upimage);
    }
    const up = ()=>
    {

        const pdf = {
            name: fields.pdfname,
            createdAt: Date.now()
          }
        fdb.ref("pdfs").push(pdf).then(child=>
            {
                
                const uploadTask =  fstorage.ref(`pdfs/${child.key}`).put(image);
                uploadTask.on('state_changed', progress=>{
             
                }, err=>{
          
                }, complete=>{
                    fstorage.ref("pdfs").child(child.key).getDownloadURL().then(url=>{
                        const newpdf = {
                                id:child.key,
                                name: pdf.name,
                                createdAt: pdf.createdAt,
                                downloadUrl:url
                        }
                        dispatch({type:actions.AddPdf,pdf:newpdf});
                    })
                });
        });
 

    reset({pdfname:'',Uploader:''});
    }

    const handleDrop = e=>{
        console.log("handleDrop")
    }
    const handleDragEnter = e=>{
        console.log("handleDrop")
    }
    const handleDragOver = e=>{
        console.log("handleDrop")
    }
    const handleDragLeave = e=>{
        console.log("handleDrop")
    }

    return(
        <div className="FileUpload form-inline">
            
            <input type="text" name="pdfname"  placeholder="Title" value={fields.pdfname} onChange={setFields}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            />
            
            <input type="file" id="item-drop" onChange={hchange} />

            <button type="button" id="righ-col" onClick={up}>Upload PDF</button>
        </div>
    );
}


export default FileUpload;