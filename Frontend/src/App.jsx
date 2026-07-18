import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";

const App = () => {

  const googleLogin = async()=>{
    const data = await signInWithPopup(auth, googleProvider);
    console.log("data",data);
    
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