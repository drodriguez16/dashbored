const storeReducer = (state, action) => {
    switch (action.type) {
        case "ResetInputRecipient":
            return { ...state, InputRecipient: action.value, AddNew: action.AddNew }
        case "InputRecipient":
            return { ...state, InputRecipient: action.value }
        case "AddNewAccount":
            return { ...state, AddNew: action.AddNew }
        case "SetContacts":
            return { ...state, Contacts: action.Contacts }
        case "SwitchTransac":
            let ST_Queue = action.TransactionQueue;
            let ST_pdfId = action.pdfId;
            let ST_Queueindex = state.pdfs.findIndex(pdf => pdf.id === ST_pdfId);
            let ST_Queueupdatepdfs = state.pdfs;
            ST_Queueupdatepdfs[ST_Queueindex].TransactionQueue = ST_Queue;
            return { ...state, pdfs: ST_Queueupdatepdfs };
        case "TransactionQueue":
            let Queue = action.Queue;
            let pdfId = action.pdfId;
            let Queueindex = state.pdfs.findIndex(pdf => pdf.id === pdfId);
            let Queueupdatepdfs = state.pdfs;
            Queueupdatepdfs[Queueindex].TransactionQueue = Queue;
            return { ...state, pdfs: Queueupdatepdfs };
        case "LinkOff":

            const Lf_indx = state.pdfs.findIndex(pdf => pdf.id === action.pdfId); //pdfs index

            const LF_trans = state.pdfs[Lf_indx].Transactions; // pdf trans

            const T_Lf_indx = state.pdfs[Lf_indx].Transactions.findIndex(trans => trans.id === action.TransactionQueue.id); // trans Index
            LF_trans[T_Lf_indx] = action.TransactionQueue; // set trans[i]

            const LF_pdfs = state.pdfs;
            LF_pdfs[Lf_indx].TransactionQueue = action.TransactionQueue;
            LF_pdfs[Lf_indx].Transactions = LF_trans;

            return { ...state, pdfs: LF_pdfs }
        case "Sent":

            const Sentindex = state.pdfs.findIndex(pdf => pdf.id === action.pdfId);
            const Sentupdatepdfs = state.pdfs;
            const trans = Sentupdatepdfs[Sentindex].Transactions;

            trans.push(action.TransactionQueue)
            Sentupdatepdfs[Sentindex].Transactions = trans;
            Sentupdatepdfs[Sentindex].TransactionQueue = action.TransactionQueue
            return { ...state, pdfs: Sentupdatepdfs }
        case "CelearAssigned":
            const ClearQueue = { id: 0, SendTo: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true };
            const ClearpdfId = action.pdfId;
            let ClearQueueindex = state.pdfs.findIndex(pdf => pdf.id === ClearpdfId);
            const ClearQueueupdatepdfs = state.pdfs;

            ClearQueueupdatepdfs[ClearQueueindex].TransactionQueue = ClearQueue;
            return { ...state, pdfs: ClearQueueupdatepdfs };
        case "Assign":

            const updatepdf = state.pdfs.find(pdf => pdf.id === action.id);
            const index = state.pdfs.findIndex(pdf => pdf.id === action.id);
            const updatepdfs = state.pdfs;
            let AssigntranIndex = 0;
            let Assigntran = null;
            let Assigntrans = [];

            if (updatepdfs[index].Transactions !== "undefined")
                if (updatepdfs[index].Transactions.length > 0) {
                    AssigntranIndex = updatepdfs[index].Transactions.findIndex(trans => trans.id === action.transId);
                    Assigntran = updatepdfs[index].Transactions.find(trans => trans.id === action.transId);
                    Assigntrans = updatepdfs[index].Transactions;
                }
            Assigntrans.push({ id: 0, SendTo: action.Recipient, isLink: false, LinkOff: false, CreatedAt: Date.now() })
            updatepdfs[index].Transactions = Assigntrans;
            updatepdf.SendTo = action.Recipient;
            updatepdfs[index] = updatepdf;
            return { ...state, pdfs: updatepdfs }
        case "AssignRecipient":

            const PdfsettingsAssignRecipient = { ...state.PdfSettings, AssignRecipient: !state.PdfSettings.AssignRecipient }
            return { ...state, PdfSettings: PdfsettingsAssignRecipient }
        case "isPdfSettings":

            const Pdfsettings = { ...state.PdfSettings, isSettings: !state.PdfSettings.isSettings }
            return { ...state, PdfSettings: Pdfsettings }
        case "isSettings":
            const settings = { ...state.Settings, isSettings: !state.Settings.isSettings }
            return { ...state, Settings: settings }
        case "SetSettings":

            return { ...state, Settings: action.settings }
        case "UpdateSettings":
            const sett = { isSettings: false, fullname: action.Settings.fullname };
            return { ...state, Settings: sett }
        case "LogOut":


            return {
                Contacts: [{ email: 'Dioscarr@gmail.com' }, { email: 'KellenOcana87@gmail.com' }, { email: 'DionelRodriguez16@gmail.com' }, { email: '3472009415@tmomail.net' }],
                Settings: { isSettings: false, fullname: '', AvatarName: 'Avatar.jpg' },
                PdfSettings: { isSettings: false, AssignRecipient: false, Recipient: '' },
                CurrentUser: {},
                fdbInitialized: false,
                SignedIn: false,
                Loading: true,
                pdfs: [],
                pdf: {
                    name: "",
                    uploadedBy: "",
                    createdAt: null,
                    size: 0
                }
            }


        case "SignedIn":
            return { ...state, SignedIn: true }
        case "SetCurrentUser":

            return { ...state, CurrentUser: action.CurrentUser }
        case "SignedOut":
            return { ...state, SignedOut: false }
        case "fdbInitialized":
            return { ...state, fdbInitialized: true }
        case "DeletePdf":
            let temppdfs = state.pdfs.filter(item => item.id !== action.pdfKey);
            return { ...state, pdfs: temppdfs }
        case "AddPdf":
            let templPdfs = state.pdfs.filter(item => !item.id !== action.pdf.id);
            templPdfs.push(action.pdf);
            return { ...state, pdfs: templPdfs, Loading: false }
        case "SetPdfs":
            debugger;
            return { ...state, pdfs: action.pdfs, Loading: action.Loading }
        default:
            return { ...state }
    }
}
export default storeReducer;