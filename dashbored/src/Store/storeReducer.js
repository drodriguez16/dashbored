const storeReducer = (state, action) => {
    switch (action.type) {
        case "LinkOff":


            const LinkOffupdatepdf = state.pdfs.find(pdf => pdf.id === action.id);
            const LinkOffindex = state.pdfs.findIndex(pdf => pdf.id === action.id);
            const LinkOffupdatepdfs = state.pdfs;

            const LinkOffIndex = LinkOffupdatepdfs[LinkOffindex].Transactions.findIndex(trans => trans.id === action.transId);
            const LinkOfftran = LinkOffupdatepdfs[LinkOffindex].Transactions.find(trans => trans.id === action.transId);
            const LinkOfftrans = LinkOffupdatepdfs[LinkOffindex].Transactions;

            LinkOfftran.LinkOff = !LinkOfftran.LinkOff;
            LinkOfftrans[LinkOffIndex] = LinkOfftran;
            LinkOffupdatepdfs[LinkOffindex].Transactions = LinkOfftrans;
            return { ...state, pdfs: LinkOffupdatepdfs }
        case "Sent":
            const Sentupdatepdf = state.pdfs.find(pdf => pdf.id === action.id);
            const Sentindex = state.pdfs.findIndex(pdf => pdf.id === action.id);
            const Sentupdatepdfs = state.pdfs;

            const tranIndex = Sentupdatepdfs[Sentindex].Transactions.findIndex(trans => trans.id === action.transId);
            const tran = Sentupdatepdfs[Sentindex].Transactions.find(trans => trans.id === action.transId);
            const trans = Sentupdatepdfs[Sentindex].Transactions;

            tran.isLink = action.isLink;
            tran.LinkOff = !tran.LinkOff;
            trans[tranIndex] = tran;
            Sentupdatepdfs[Sentindex].Transactions = trans;

            return { ...state, pdfs: Sentupdatepdfs }
        case "Assign":

            const updatepdf = state.pdfs.find(pdf => pdf.id === action.id);
            const index = state.pdfs.findIndex(pdf => pdf.id === action.id);
            const updatepdfs = state.pdfs;
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
        case "UpdateSettings":
            debugger
            const sett = { isSettings: false, fullname: action.Settings.fullname };
            return { ...state, Settings: sett }
        case "LogOut":
            return { ...state, SignedIn: false }
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
            return { ...state, pdfs: action.pdfs, Loading: action.Loading }
        default:
            return { ...state }
    }
}
export default storeReducer;