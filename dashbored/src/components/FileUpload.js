import React,{useState,useContext} from 'react'
import {fdb, fstorage} from '../API/firebase'
import { db, actions } from '../Store'
import useForm from '../hooks/useForm';

const FileUpload = ()=>
{
    const {state, dispatch} = useContext(db);
    const [image, setImage] = useState(null);
    const [fields, setFields,reset] = useForm({pdfname:'',Uploader:''});


    const styles = {
        inputWrapper: 'input-wrapper',
        inputCover: 'input-cover',
        helpText: 'help-text',
        fileName: 'file-name',
        fileNameStretch: 'file-name spacer',
        fileExt: 'file-ext',
        fileDrag: 'file-drag',
        input: 'input',
        loader: 'loader',
        disabled: 'disabled',
        loading: 'loading',
        loaderItem: 'loader-item',
        spacer: 'spacer',
        button: 'button',
        hover: 'hover',
        imagePreview: 'image-preview',
        preview: 'preview',
        previewItem: 'preview-item',
        previews: 'previews'
      };


    const hchange=e=>
    {
        const upimage =  e.target.files[0];
        setImage(upimage);
    }
    const up = ()=>
    {

        const pdf = {
            name: fields.pdfname,
            uploadedBy: fields.Uploader,
            createdAt: Date.now()
          }
        fdb.ref("pdfs").push(pdf).then(child=>
            {
                console.log("new child" + child.key);
                const uploadTask =  fstorage.ref(`pdfs/${child.key}`).put(image);
                uploadTask.on('state_changed', progress=>{
                console.log(progress);
                }, err=>{
                console.log(err);
                }, complete=>{
                    fstorage.ref("pdfs").child(child.key).getDownloadURL().then(url=>{
                        const newpdf = {
                                id:child.key,
                                name: pdf.name,
                                uploadedBy: pdf.uploadedBy,
                                createdAt: pdf.createdAt,
                                downloadUrl:url
                        }
                        dispatch({type:actions.AddPdf,pdf:newpdf});
                    })
                });
        });
        // fdb.ref("pdfs").on("child_added", snapshot=>{
        //

        // });



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
        <div className="FileUpload">
            <div>FileName</div>
            <input type="text" name="pdfname" value={fields.pdfname} onChange={setFields}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            />
            <div>Uploaded by</div>
            <input type="text" name="Uploader" value={fields.Uploader} onChange={setFields}/>
            <div>Choose a pdf</div>
            <input type="file" onChange={hchange} />
            <button type="button" onClick={up}>Upload PDF</button>
        </div>
    );
}


export default FileUpload;