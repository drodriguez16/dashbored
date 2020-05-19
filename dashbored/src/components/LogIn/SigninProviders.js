import React, { useContext, useState, useCallback } from 'react'
import './LoginForm.scss'
import { auth, fdb } from '../../API/firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { db, actions, documents } from '../../Store';

const SigninProviders = () => {
    const { state, dispatch } = useContext(db);
    const [config, setConfig] = useState(null)

    const cb = useCallback((authResult, redirectUrl) => {



        dispatch({ type: actions.SignedIn });
        if (authResult.additionalUserInfo.providerId === "google.com") {
            const avatar = authResult.additionalUserInfo.profile.picture;
            const name = authResult.additionalUserInfo.profile.name;
            dispatch({ type: actions.SetCurrentUser, CurrentUser: { email: authResult.user.email, avatar: avatar, name: name } });

        }
        fdb.ref(("/")).once("value", cb => {
            if (cb.val() === null) {
                fdb.ref((documents.CurrentUser(authResult.user))).set(state.Settings)
                // fdb.ref(documents.contactBook(user)).push({ email: user.email })
            }
            else {
                fdb.ref((documents.CurrentUser(authResult.user))).once("value", cb => {
                    const settings = cb.val();
                    if (settings != null)
                        dispatch({ type: actions.SetSettings, settings: settings })
                })

                fdb.ref((documents.contactBook(authResult.user))).once("value", cb => {
                    const contactBook = [];
                    cb.forEach(item => contactBook.push(item.val()))
                    dispatch({ type: actions.SetContacts, Contacts: contactBook })
                })
            }
        });

    }, []);
    const uiConfig = () => {
        return {
            signInFlow: "popup",
            signInOptions: [
                auth.GoogleAuthProvider.PROVIDER_ID,
                auth.FacebookAuthProvider.PROVIDER_ID,
                auth.TwitterAuthProvider.PROVIDER_ID,
                auth.GithubAuthProvider.PROVIDER_ID,
                // auth.EmailAuthProvider.PROVIDER_ID,
                auth.PhoneAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: cb
            }
        };
    }
    return (<StyledFirebaseAuth uiConfig={uiConfig()} firebaseAuth={auth()} />);
}

export default SigninProviders; 