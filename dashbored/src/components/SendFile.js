import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const SendFile = (props) => {
    const { classes, state, dispatch, actions, pdfitem } = props;

    const sendLink = ({ To, fileLink, fileName, size }) => {
        debugger;
        if (To.indexOf("@") !== -1) {
            const url = `${process.env.REACT_APP_FUNCSENDEMAIL}dest=${To}&downloadlink=${fileLink}&useremail=${state.CurrentUser.email}&sendername=${state.Settings.fullname}&fileName=${fileName}&size=${size}`;
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
            xhr.send()
        }
    }
    return (<div className="the-file" >
        <div className="SendTo">
            <IconButton aria-label="delete" className={classes.send} onClick={() => { sendLink({ To: pdfitem.SendTo, fileLink: pdfitem.downloadUrl, fileName: pdfitem.name, size: pdfitem.size }) }}>
                <SendIcon fontSize="small" />
            </IconButton>
        </div>
        <a href={`${pdfitem.downloadUrl}`} rel="noopener noreferrer" target="_blank" download={`${pdfitem.name}.pdf`}>{`${pdfitem.name}.pdf`}</a>
    </div>)
}
export default SendFile;