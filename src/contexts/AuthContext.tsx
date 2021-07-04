import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
  emailVerified: boolean | null;
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}
//Creating contextApi
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [ user , setUser ] = useState<User>(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        const { displayName, photoURL, uid, email, emailVerified } = user;
        if(!displayName || !photoURL) {
          throw new Error(`Missing information from Google Account.`);
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email: email,
          emailVerified: emailVerified,
        });
      }
    })  
    return () => {
      unsubscribe();
    };
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const data =  await auth.signInWithPopup(provider);
    if(data.user) {
      const { displayName, photoURL, uid, email, emailVerified } = data.user;
      if(!displayName || !photoURL) {
        throw new Error(`Missing information from Google Account.`);
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email: email,
        emailVerified: emailVerified,
      });
    }
  }
  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider> 
  );
}