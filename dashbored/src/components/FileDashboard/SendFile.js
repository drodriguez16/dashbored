import React, { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fdb, fstorage } from '../../API/firebase';
import validateEmail from '../../Store/utils/index'

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

    const sendLink = ({ To, AltEmail, fileLink, fileName, size }) => {
        if (validateEmail(To) || validateEmail(AltEmail)) {
            const url = `${CloudFuncSendEmail}dest=${validateEmail(AltEmail) ? AltEmail : To}&downloadlink=${fileLink}&useremail=${state.CurrentUser.email}&sendername=${state.Settings.fullname}&fileName=${fileName}&size=${size}`;
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            xhr.send()



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

                    const transKey = fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${pdfitem.id}/Transactions`).push().key;
                    pdfitem.TransactionQueue.id = transKey;
                    pdfitem.TransactionQueue.init = false;
                    pdfitem.TransactionQueue.isLink = true;
                    pdfitem.TransactionQueue.LinkOff = true;
                    pdfitem.TransactionQueue.DownloadUrl = fileLink;
                    pdfitem.TransactionQueue.SendTo = validateEmail(AltEmail) ? AltEmail : To
                    fdb.ref(`Accounts/${state.CurrentUser.email.replace(".", "")}/pdfs/${pdfitem.id}/Transactions/${transKey}`).update(pdfitem.TransactionQueue);
                    dispatch({ type: actions.Sent, TransactionQueue: pdfitem.TransactionQueue, pdfId: pdfitem.id });
                    dispatch({ type: actions.ResetInputRecipient, value: "", AddNew: false })

                }, 2000);
            }
        }
    }


    return (<div className="the-file" >
        <div className="SendTo">
            <IconButton aria-label="delete" className={classes.send} onClick={() => { sendLink({ To: pdfitem.TransactionQueue.SendTo, AltEmail: state.InputRecipient, fileLink: pdfitem.downloadUrl, fileName: pdfitem.name, size: pdfitem.size }) }}>
                <SendIcon fontSize="small" />  {loading && <CircularProgress size={26} className={classes.fabProgress} />}
            </IconButton>
        </div>
        <a href={`${pdfitem.downloadUrl}`} rel="noopener noreferrer" target="_blank" download={`${pdfitem.name}.pdf`}>{`${pdfitem.name}`}</a>
    </div>)
}
export default SendFile;