const initialState={
  products:[],
};

export const productReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case "SET_PRODUCT":
            return{...state,products:payload};
        case "REMOVE_PRODUCT":
            return{...state,products:[]};
        default:
            return state;
    }
}

export const SelectedProductReducer=(state={},{type,payload})=>{
    switch(type){
        case "SELECT_PRODUCT":
            return{...state,...payload};
       case "REMOVE_SELECTED_PRODUCT":
                return {};
        default:
            return state;
    }
}