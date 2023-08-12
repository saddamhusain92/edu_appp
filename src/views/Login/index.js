import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SignedIn,
  SignedOut,
  // useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Dashboard from "../Dashboard";

function Login() {
  return (
    <>
      <SignedIn>
        <ToastContainer/>
        <Dashboard/>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>


  );
}


export default Login;