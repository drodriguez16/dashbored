import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fdb, fstorage } from '../API/firebase';







const CloudFuncSendEmail = process.env.REACT_APP_FUNCSENDEMAIL;

const SendFile = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;
    const [CloudFuncSendEmail, setCloudFuncSendEmail] = useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    useEffect(() => {

        setCloudFuncSendEmail("https://us-central1-dashbrd-152dc.cloudfunctions.net/sendMail?");
    }, [])

    const sendLink = ({ To, fileLink, fileName, size }) => {
        if (To.indexOf("@") !== -1) {
            // const url = `${CloudFuncSendEmail}dest=${To}&downloadlink=${fileLink}&useremail=${state.CurrentUser.email}&sendername=${state.Settings.fullname}&fileName=${fileName}&size=${size}`;
            // var xhr = new XMLHttpRequest()
            // xhr.open('GET', url)
            // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            // xhr.send()



            if (!loading) {
                setSuccess(false);
                setLoading(true);
                timer.current = setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);





                    // let pdf = fstorage.ref("pdfs").child(pdfitem.id);
                    // pdf.getDownloadURL().then(url => {
                    //     console.log(url)
                    // });

                    const transKey = fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}/${pdfitem.id}/Transactions`).push().key;
                    pdfitem.TransactionQueue.id = transKey;
                    pdfitem.TransactionQueue.init = false;
                    pdfitem.TransactionQueue.isLink = true;
                    pdfitem.TransactionQueue.LinkOff = true;
                    fdb.ref(`pdfs/${state.CurrentUser.email.replace(".", "")}/${pdfitem.id}/Transactions/${transKey}`).update(pdfitem.TransactionQueue);
                    dispatch({ type: actions.Sent, TransactionQueue: pdfitem.TransactionQueue, pdfId: pdfitem.id });
                }, 2000);
            }
        }
    }


    return (<div className="the-file" >
        <div className="SendTo">
            <IconButton aria-label="delete" className={classes.send} onClick={() => { sendLink({ To: pdfitem.TransactionQueue.SendTo, fileLink: pdfitem.downloadUrl, fileName: pdfitem.name, size: pdfitem.size }) }}>
                <SendIcon fontSize="small" />  {loading && <CircularProgress size={26} className={classes.fabProgress} />}
            </IconButton>

        </div>
        <a href={`${pdfitem.downloadUrl}`} rel="noopener noreferrer" target="_blank" download={`${pdfitem.name}.pdf`}>{`${pdfitem.name}.pdf`}</a>
    </div>)
}
export default SendFile;