import React,{useContext, useState, useCallback} from 'react'
import './LoginForm.scss'
import {auth} from '../API/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {db, actions} from '../Store';

const SigninProviders = ()=>
{
    const {state, dispatch}= useContext(db);
    const [config, setConfig] = useState(null)

    const cb =useCallback((authResult, redirectUrl)=>
    {
        debugger;
        dispatch({type:actions.SetCurrentUser,CurrentUser:{email:authResult.user.email}});

    },[]);
    const uiConfig = ()=>{
        return {
            signInFlow:"popup",
            signInOptions: [
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.FacebookAuthProvider.PROVIDER_ID,
                auth.TwitterAuthProvider.PROVIDER_ID,
                auth.GithubAuthProvider.PROVIDER_ID,
                // auth.EmailAuthProvider.PROVIDER_ID,
                auth.PhoneAuthProvider.PROVIDER_ID
            ],
            callbacks:{
                signInSuccessWithAuthResult:cb
            }
        };
    }
    return(<StyledFirebaseAuth uiConfig={uiConfig()} firebaseAuth={auth()} />);
}

export default SigninProviders;