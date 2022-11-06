import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../../firebase/firebase.config';
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { useEffect } from 'react';

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoadin] = useState(true);

    const createUser =(email,password)=>{
        setLoadin(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const login =(email,password)=>{
        setLoadin(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout =()=>{
        localStorage.removeItem('token');
        setLoadin(true)
        return signOut(auth)
    }

    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log(currentUser);
            setUser(currentUser)
            setLoadin(false)
        });
        return ()=>{
            return unsubscribe;
        }
    },[])

    const authInfo={user,loading,createUser,login,logout}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;