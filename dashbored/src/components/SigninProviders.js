import React from 'react'
import './LoginForm.scss'
import {auth} from '../API/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
var uiConfig = {
    signInFlow:"popup",
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
      auth.TwitterAuthProvider.PROVIDER_ID,
       auth.GithubAuthProvider.PROVIDER_ID,
      auth.EmailAuthProvider.PROVIDER_ID,
      auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks:{
        signInSuccess:()=>false
    }

  };
const SigninProviders = ()=>
{    return(<div className="LoginForm">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
        </div>);
}

export default SigninProviders;