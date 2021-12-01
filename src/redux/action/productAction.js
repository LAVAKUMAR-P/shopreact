export const setProducts=(products)=>{
    return{
       type:"SET_PRODUCT",
       payload:products,
    }
}

export const selectProduct=(product)=>{
    return{
        type:"SELECT_PRODUCT",
        payload:product,
    }
}

export const removeSelectedProduct = () => {
    return {
      type:"REMOVE_SELECTED_PRODUCT",
    };
  };

  export const removeProduct = () => {
    return {
      type:"REMOVE_PRODUCT",
    };
  };