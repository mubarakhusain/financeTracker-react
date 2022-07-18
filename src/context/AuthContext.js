import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });
  console.log("AuthContext state:", state);
  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { createContext, useReducer } from "react/cjs/react.production.min";

// export const AuthContext = createContext()
// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload }
//     default:
//       return state
//   }
// }

// export const AuthContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     user: null
//   })
//   return (
//     <AuthContext.provider value={{...state, dispatch}}>
//       {children}
//     </AuthContext.provider>
//   )
// }
