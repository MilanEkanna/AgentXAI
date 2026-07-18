import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";

const App = () => {

  const handleLogin = async(token)=>{
    try{
      const {data} = await api.post("/auth/login", {token})
      console.log("data", data);
      
    }catch(err){
      console.log("Error in login", err);
      
    }
  }

  const googleLogin = async()=>{
    const data = await signInWithPopup(auth, googleProvider); // this is for desktop and for mobile  use signInWithRedirect in this the page changes and then come back after login in
    const token = await data.user.getIdToken(); //eturns the current token if it has not expired or if it will not expire in the next five minutes. Otherwise, this will refresh the token and return a new on
    console.log("token",token);
    await handleLogin(token)
    // console.log("data",data);
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={googleLogin}>
        Continue with google
      </button>
    </div>
  );
};

export default App;