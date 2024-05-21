import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { fetchData } from "../Apihandler/api";

const userAuthContext = createContext();



export function UserAuthContextProvider({children}) {

    const [user, setUser] = useState({});
    const [data, setData] = useState(null);


    function signUp(email,password){
        return createUserWithEmailAndPassword(auth, email, password);
    }


    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function adminLogin(email,password) {
        return signInWithEmailAndPassword(auth, email, password);        
    }

    function logout(){
        return signOut(auth);
    }

    function googleSign() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    





    useEffect(() => {
        // usercalling-------------------------------------------
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{            
            setUser(currentUser);
        });

        // Api calling---------------------------------------------------------
        const getData = async () => {
            const result = await fetchData();
            setData(result);
        };
        return ()=>{
            unsubscribe();
            getData();
        }    
    }, []);


    const value = {
        user,
        adminLogin,
        signUp,
        login,
        logout,
        googleSign,
        data,
        resetPassword
    }
    




    return (<userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>)
}

export function useUserAuth(){
    return useContext(userAuthContext)
}