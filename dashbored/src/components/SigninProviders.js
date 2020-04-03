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
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
           alert("signInSuccessWithAuthResult")
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          }
    }

  };
const SigninProviders = ()=>
{    return(<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />);
}

export default SigninProviders;