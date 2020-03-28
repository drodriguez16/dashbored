

const storeReducer = (state, action) => {
    switch (action.type) {
        case "fdbInitialized":
            return {...state, fdbInitialized:true}
        case "DeletePdf":
            let temppdfs = state.pdfs.filter(item=>item.id!==action.pdfKey);
            return {...state,pdfs: temppdfs}
        case "AddPdf":
            debugger;
                let templPdfs = state.pdfs;
                templPdfs.push(action.pdf);
            return {...state, pdfs:templPdfs, Loading:false}
        case "SetPdfs":
            return {...state,pdfs:action.pdfs,Loading:action.Loading}
        default:
            return { ...state }
    }
}
export default storeReducer;
