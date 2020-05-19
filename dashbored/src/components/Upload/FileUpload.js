import React, { useState, useContext } from 'react'
import { fdb, fstorage } from '../../API/firebase'
import { db, actions } from '../../Store'
import useForm from '../../hooks/useForm';
import "./FileUpload.scss";

const FileUpload = () => {
    const { state, dispatch } = useContext(db);
    const [image, setImage] = useState(null);
    const [fields, setFields, reset] = useForm({ pdfname: '' });
    const [dragging, setDragging] = useState(false);
    const [draggingOver, setdraggingOver] = useState(false);
    const [dropit, setDropit] = useState(false);
    const hchange = e => {
        const upimage = e.target.files[0];
        debugger;
        reset({ pdfname: upimage.name.split(".")[0] })
        setImage(upimage);
    }
    const up = e => {

        const key = fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/`).push().key;
        const uploadTask = fstorage.ref(`pdfs/${key}`).put(image);
        uploadTask.on('state_changed', progress => {
        }, err => {
        }, complete => {
            fstorage.ref(`pdfs`).child(key).getDownloadURL().then(url => {
                const pdf = {
                    id: key,
                    name: fields.pdfname,
                    createdAt: Date.now(),
                    downloadUrl: url,
                    size: image.size,
                    SendTo: "",
                    TransactionQueue: { id: 0, SendTo: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true }
                }
                fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${key}`).update(pdf);
                const transId = fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${key}/Transactions`).push().key;
                fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${key}/Transactions/${transId}`).update({ id: transId, SendTo: "", DownloadUrl: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true });
                pdf.Transactions = [{ id: transId, SendTo: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true }];

                dispatch({ type: actions.AddPdf, pdf: pdf });
            })
        });
        reset({ pdfname: '', Uploader: '' });
        setDropit(false);
        setDragging(false)
        setdraggingOver(false)
        image.value = null;
    }
    const handleDrop = e => {
        setDropit(true);
        setdraggingOver(false)
    }
    const handleDragEnter = e => {
        setDragging(true)
    }
    const handleDragOver = e => {
        setdraggingOver(true)
    }
    const handleDragLeave = e => {
        setDragging(true)
        setdraggingOver(false)
    }
    const onfilechange = e => {
        alert(e.value)
    }

    return (
        <div className="fileUpload form-inline " data-file={(fields.pdfname === "" && !dragging) ? "no-file" : "file"}>
            <div><input type="text" name="pdfname" placeholder="Title" value={fields.pdfname} onChange={setFields}
            /></div>
            {(dragging) && (<div className="FileDropOverlay"
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {(draggingOver) ? (<div className="DraggingOverContent">Drop it!</div>) : (<div className="DraggingOverContent">
                    {(dropit && fields.image !== null) ? (<div>{`${fields.pdfname === "" ? 'WhatismynameBitch' : fields.pdfname}.pdf`}</div>) : (<div>Teasing me</div>)}
                </div>)}
            </div>)}
            <div className="item-drop-box"><input type="file"
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}

                id="item-drop" onChange={hchange} /></div>
            <div className="upload-pdf">
                {(fields.pdfname !== "" && image !== null) && (<button type="button" id="righ-col" onClick={up}>Upload</button>)}
                {(fields.pdfname === "" || image === null) && (<button style={{ backgroundColor: '#80808087' }} disabled type="button" id="righ-col" onClick={up}>Upload</button>)}
            </div>
        </div>
    );
}
export default FileUpload;