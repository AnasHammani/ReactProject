import React ,{createContext, useState,useEffect} from 'react';

export const UserContext = createContext();

//var user = JSON.parse(localStorage.getItem('user'))

const UserContextProvider = props => {
  const [user,setUser]= useState({});

  useEffect(()=>{

    setUser(JSON.parse(localStorage.getItem('user')))
  
  
  },[]);
  

  return(


    <UserContext.Provider value={{user}}>
        {props.children}
    </UserContext.Provider>
  )

}
export default UserContextProvider;