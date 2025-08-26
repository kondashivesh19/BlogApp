import React, { Children, useState } from 'react'
import { createContext } from 'react'
export const userContextObj= createContext(); 

function UserContext({children}) {

    let [currentUser,setCurrentUser]=useState({
        firstName:"",
        lastName:"",
        email:"",
        profileImageUrl:"",
        role:""
    });

  return (
    <userContextObj.Provider value={{currentUser,setCurrentUser}}>
        {children}
    </userContextObj.Provider>
  )
}

export default UserContext