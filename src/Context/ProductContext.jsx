import { useReducer, createContext } from "react";

const initialState = {
  products: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
