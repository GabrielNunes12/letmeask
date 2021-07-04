import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";
import { BrowserRouter, Route } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { firebase, auth } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>;
}

//Creating contextApi
export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [ user , setUser ] = useState<User>(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, photoURL, uid } = user;
        if(!displayName || !photoURL) {
          throw new Error(`Missing information from Google Account.`);
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
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
      const { displayName, photoURL, uid } = data.user;
      if(!displayName || !photoURL) {
        throw new Error(`Missing information from Google Account.`);
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, signInWithGoogle}}>
        <Route path="/" exact component={Home}></Route>
        <Route path="/newRoom" component={NewRoom}></Route>
      </AuthContext.Provider> 
    </BrowserRouter>
  );
}

export default App;
