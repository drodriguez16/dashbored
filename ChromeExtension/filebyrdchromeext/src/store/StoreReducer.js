const StoreReducer = (state, action) => {
    switch (action.type) {
        case "SetLoading":
            return { ...state, Loading: action.Loading }       
        default:
            return { ...state }
    }
}
export default StoreReducer;
