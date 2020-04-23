const storeReducer = (state, action) => {
    switch (action.type) {
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
