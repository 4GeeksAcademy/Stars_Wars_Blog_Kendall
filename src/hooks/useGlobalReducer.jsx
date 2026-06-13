import { useContext, useReducer, createContext } from "react";
import { globalReducer, initialState } from "../store";  

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(globalReducer, initialState);

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);
    return { dispatch, store };
}