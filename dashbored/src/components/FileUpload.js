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

    const filedropStyle = {
        backgroundColor:'black'
    }
    const handleDrop = e=>{
      setDropit(true);
      setdraggingOver(false)

        console.log("handleDrop")
    }
    const handleDragEnter = e=>{
        setDragging(true)
        console.log("handleDrop")
    }
    const handleDragOver = e=>{
        setdraggingOver(true)
        console.log("handleDrop")
    }
    const handleDragLeave = e=>{
        setDragging(true)
        setdraggingOver(false)
        console.log("handleDrop")
    }

    return(
        <div className="fileUpload form-inline ">

            <div><input type="text" name="pdfname"   placeholder="Title" value={fields.pdfname} onChange={setFields}
            /></div>
            {(dragging )&&(<div className="FileDropOverlay"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            >
                {(draggingOver)?(<div className="DraggingOverContent">Drop it!</div>):(<div className="DraggingOverContent">
                   {(dropit && fields.image!==null)? (<div>{`${fields.pdfname===""?'Whatismyname':fields.pdfname}.pdf`}</div>):(<div>Teasing me</div>)}
                    </div>)}
                </div>)}
            <div><input type="file"
            style={{}}
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