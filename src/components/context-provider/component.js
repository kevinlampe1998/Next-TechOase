'use client'
import { useReducer, createContext, useEffect } from "react";

const initialState = {
    user: undefined,
    admin: undefined,
    cart: undefined,
    renewCartLogo: true
  };

export const reducer = (state, action) => {
    if (action.type === 'users-register' || action.type === 'users-login') {
        return { ...state, user: action.payload };
      }
    
      if (action.type === 'users-logout') {
        return { ...state, user: undefined };
      }
      if (action.type === 'admin-login') {
        return { ...state, admin: action.payload };
      }

      if (action.type === 'set-cart') {
        return { ...state, cart: action.payload };
      }

      if (action.type === 'renew-cart-logo') {
        return { ...state, renewCartLogo: !state.renewCartLogo };
      }
    
      return state;
};

export const TheContext = createContext();

const ContextProvider = ({ children }) => {
    const [localDataBank, dispatch] = useReducer( reducer, initialState );

    const loginAtStart = async () => {
      try {
        const res = await fetch('/api/users/login-at-start', {
          method: 'POST',
          credentials: 'include'
        });
    
        const data = await res.json();
    
        dispatch({ type: 'users-login', payload: data.searchedUser });
  
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      loginAtStart();
    }, []);

    return (
        <TheContext.Provider value={{ localDataBank, dispatch }}>
            { children }
        </TheContext.Provider>
    );
};

export default ContextProvider;