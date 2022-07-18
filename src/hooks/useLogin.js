import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCncelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });
      //update state
      if (!isCncelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, isPending, error };
};
