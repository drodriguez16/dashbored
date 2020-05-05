const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });






admin.initializeApp(functions.config().firebase);


exports.createDownloadLink = functions.firestore.document('pdfs').onUpdate((change, context) => {

    const { Storage } = require('@google-cloud/storage');
    const storage = new Storage();
    const bucket = storage.bucket('dashbrd-152dc.appspot.com');

    const options = {
        destination: 'pdfs/hello_world.dog'
    };

    bucket.upload('hello_world.ogg', options).then(function (data) {
        return 0;
        // const file = data[0];
    });

    return 0;
});



/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@apt3k.com',
        pass: 'Apt3k10040key1'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.info("getting dest email by query string")
        // getting dest email by query string
        const { dest, downloadlink, token, useremail, sendername, fileName, size } = req.query;
        //alert(downloadlink);
        const mailOptions = {
            from: 'dashbrd <noreply@apt3k.com>', // Something like: Jane Doe <janedoe@gmail.com>
            replyTo: 'dashbrd <noreply@apt3k.com>',
            to: dest,
            subject: 'Dashbrd doing its thing!', // email subject
            html: `
            <div style="display: grid; background-color: #f7f7f7; padding:10px 0px 30px;" >
            <img src="https://user-images.githubusercontent.com/6876354/79923933-9b645180-8404-11ea-8472-f55508dcbf5a.png" 
            style="margin:30px auto;"
            alt="Logo" title="Logo" style="display:block" width="200" height="87" />  
                <div style="background-color:white; width: 300px; margin:10px auto; border:1px solid #92929226; padding:60px; ">
                    <div style="font-size:17px; color: #4c4c4c;font-weight: 600;">${sendername} ${useremail}</div>                    
                    <p style="font-size: 16px; color: #929292; font-weight: 600;">Sent you the following file(s)</p>
                    <hr/>
                    <div style="margin:15px 0px;">${fileName}.pdf</div>
                    <a 
                        href="${downloadlink.replace("/pdfs/-", "/pdfs%2F-")}&token=${token}"
                        rel="noopener noreferrer"
                        target="_blank"
                        download="${fileName}.pdf"
                        style="	text-decoration:none;">
                        <div style="text-decoration: none; padding: 11px 8px; background: #5eb6e6; color: white; cursor: pointer; border-radius: 10px; display: block; width: 294px; text-align: center; letter-spacing:0.5px">Download</div>
                    </a>
                    <div style="margin:15px 0px;">
                        <div style="float:left; display:inline;width:150px; height:60px;">
                            <div style="color: #929292; font-weight: 600;">Expires on:</div>
                            <div style="color:#4c4c4c">3/26/2021</div>
                        </div>
                        <div style="float:right; display:inline;width:150px; height:60px;">
                            <div style="color: #929292; font-weight: 600;">File Size:</div>
                            <div style="color:#4c4c4c">${(size / 1024).toFixed(0)}mb</div>
                        </div>
                    </div>
                </div>
            </div>
        ` // email content in HTML
        };
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
