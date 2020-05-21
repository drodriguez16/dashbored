import { init } from './data'

let Settings = {}
const storeReducer = (state, action) => {
    switch (action.type) {
        case "Setfilebyrd":
            return { ...state, filebyrd: action.filebyrd }
        case "ResetInputRecipient":
            return { ...state, InputRecipient: action.value, AddNew: action.AddNew }
        case "InputRecipient":
            return { ...state, InputRecipient: action.value }
        case "AddNewAccount":
            return { ...state, AddNew: action.AddNew }
        case "SetContacts":
            return { ...state, Contacts: action.Contacts }
        case "SwitchTransac":
            if (action.direction === "outbox") {
                let ST_Queue = action.TransactionQueue;
                let ST_pdfId = action.pdfId;
                let ST_Queueindex = state.pdfs.findIndex(pdf => pdf.id === ST_pdfId);
                let ST_Queueupdatepdfs = state.pdfs;
                ST_Queueupdatepdfs[ST_Queueindex].TransactionQueue = ST_Queue;
                return { ...state, pdfs: ST_Queueupdatepdfs };
            }
            else {
                let ST_Queue = action.TransactionQueue;
                let ST_pdfId = action.pdfId;
                let ST_Queueindex = state.filebyrd.findIndex(pdf => pdf.id === ST_pdfId);
                let ST_Queueupdatepdfs = state.filebyrd;
                ST_Queueupdatepdfs[ST_Queueindex].TransactionQueue = ST_Queue;
                return { ...state, filebyrd: ST_Queueupdatepdfs };
            }
        case "TransactionQueue":
            if (action.direction === "outbox") {
                let Queue = action.Queue;
                let pdfId = action.pdfId;
                let Queueindex = state.pdfs.findIndex(pdf => pdf.id === pdfId);
                let Queueupdatepdfs = state.pdfs;
                Queueupdatepdfs[Queueindex].TransactionQueue = Queue;
                return { ...state, pdfs: Queueupdatepdfs };
            }
            else {
                let Queue = action.Queue;
                let pdfId = action.pdfId;
                let Queueindex = state.filebyrd.findIndex(pdf => pdf.id === pdfId);
                let Queueupdatepdfs = state.filebyrd;
                Queueupdatepdfs[Queueindex].TransactionQueue = Queue;
                return { ...state, filebyrd: Queueupdatepdfs };
            }
        case "LinkOff":

            if (action.direction === "outbox") {
                const Lf_indx = state.pdfs.findIndex(pdf => pdf.id === action.pdfId); //pdfs index
                const LF_trans = state.pdfs[Lf_indx].Transactions; // pdf trans
                const T_Lf_indx = state.pdfs[Lf_indx].Transactions.findIndex(trans => trans.id === action.TransactionQueue.id); // trans Index
                LF_trans[T_Lf_indx] = action.TransactionQueue; // set trans[i]
                const LF_pdfs = state.pdfs;
                LF_pdfs[Lf_indx].TransactionQueue = action.TransactionQueue;
                LF_pdfs[Lf_indx].Transactions = LF_trans;
                return { ...state, pdfs: LF_pdfs }
            }
            else {
                const Lf_indx = state.filebyrd.findIndex(pdf => pdf.id === action.pdfId); //pdfs index
                const LF_trans = state.filebyrd[Lf_indx].Transactions; // pdf trans
                const T_Lf_indx = state.filebyrd[Lf_indx].Transactions.findIndex(trans => trans.id === action.TransactionQueue.id); // trans Index
                LF_trans[T_Lf_indx] = action.TransactionQueue; // set trans[i]
                const LF_pdfs = state.filebyrd;
                LF_pdfs[Lf_indx].TransactionQueue = action.TransactionQueue;
                LF_pdfs[Lf_indx].Transactions = LF_trans;
                return { ...state, filebyrd: LF_pdfs }
            }

        case "Sent":

            const Sentindex = state.pdfs.findIndex(pdf => pdf.id === action.pdfId);
            const Sentupdatepdfs = state.pdfs;
            const trans = Sentupdatepdfs[Sentindex].Transactions;

            trans.push(action.TransactionQueue)
            Sentupdatepdfs[Sentindex].Transactions = trans;
            Sentupdatepdfs[Sentindex].TransactionQueue = action.TransactionQueue
            return { ...state, pdfs: Sentupdatepdfs }
        case "CelearAssigned":
            if (action.direction === "outbox") {
                const ClearQueue = { id: 0, SendTo: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true };
                const ClearpdfId = action.pdfId;
                let ClearQueueindex = state.pdfs.findIndex(pdf => pdf.id === ClearpdfId);
                const ClearQueueupdatepdfs = state.pdfs;
                ClearQueueupdatepdfs[ClearQueueindex].TransactionQueue = ClearQueue;
                return { ...state, pdfs: ClearQueueupdatepdfs };
            }
            else {
                const InboxClearQueue = { id: 0, SendTo: "", isLink: false, LinkOff: false, CreatedAt: Date.now(), init: true };
                const InboxClearpdfId = action.pdfId;
                let InboxClearQueueindex = state.filebyrd.findIndex(pdf => pdf.id === InboxClearpdfId);
                const InboxClearQueueupdatepdfs = state.filebyrd;
                InboxClearQueueupdatepdfs[InboxClearQueueindex].TransactionQueue = InboxClearQueue;
                return { ...state, filebyrd: InboxClearQueueupdatepdfs };
            }
        case "Assign":
            if (action.direction === "outbox") {
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
            }
            else {
                const updatepdf = state.filebyrd.find(pdf => pdf.id === action.id);
                const index = state.filebyrd.findIndex(pdf => pdf.id === action.id);
                const updatepdfs = state.filebyrd;
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
                return { ...state, filebyrd: updatepdfs }
            }
        case "AssignRecipient":

            const PdfsettingsAssignRecipient = { ...state.PdfSettings, AssignRecipient: !state.PdfSettings.AssignRecipient }
            return { ...state, PdfSettings: PdfsettingsAssignRecipient }
        case "isPdfSettings":

            const Pdfsettings = { ...state.PdfSettings, isSettings: !state.PdfSettings.isSettings }
            return { ...state, PdfSettings: Pdfsettings }
        case "isSettings":
            Settings = state.Settings;
            Settings.isSettings = !state.Settings.isSettings;
            return { ...state, Settings: Settings }
        case "SetSettings":

            return { ...state, Settings: action.settings }
        case "UpdateSettings":
            const sett = { isSettings: false, fullname: action.Settings.fullname };
            return { ...state, Settings: sett }
        case "LogOut":
            return {
                InputRecipient: "",
                AddNew: false,
                Contacts: [{ email: 'Dioscarr@gmail.com' }, { email: 'KellenOcana87@gmail.com' }, { email: 'DionelRodriguez16@gmail.com' }, { email: '3472009415@tmomail.net' }],
                Settings: { isSettings: false },
                PdfSettings: { isSettings: false, AssignRecipient: false, Recipient: '' },
                CurrentUser: { email: "", avatar: "", name: "", logged: false },
                fdbInitialized: false,
                SignedIn: false,
                Loading: true,
                pdfs: [],
                filebyrd: [],
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

            // Settings = state.Settings;
            // Settings.AvatarName = action.avatar
            // Settings.fullname = action.name
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

            return { ...state, pdfs: action.pdfs, Loading: action.Loading }
        default:
            return { ...state }
    }
}
export default storeReducer;