import { createContext, useContext } from "react";

export const FirebaseContext = createContext()

export function useFirebaseContext(){
    return useContext(FirebaseContext)
}