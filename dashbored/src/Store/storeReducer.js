

const storeReducer = (state, action) => {
    switch (action.type) {
case "SetPdfs":
    return {...state,pdfs:action.pdfs,Loading:action.Loading}
        default:
            return { ...state }
    }
}
export default storeReducer;
