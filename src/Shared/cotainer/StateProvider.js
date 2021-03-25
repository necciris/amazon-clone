import React, { useContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/firebase';
import reducer, { initialState } from '../reducer/Reducer';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser)
                dispatch({
                    type: 'SET_USER',
                    user: authUser,
                });
            else
                dispatch({
                    type: 'SET_USER',
                    user: null,
                });
        });
    }, []);

    return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
