import {firebase} from './firebase'
import * as firebaseui from 'firebaseui'

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(new firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: [{
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      requireDisplayName: false
}],
    // Other config options...
});


//   // Is there an email link sign-in?
// if (ui.isPendingRedirect()) {
//     ui.start('#firebaseui-auth-container', uiConfig);
//   }
//   // This can also be done via:
//   if ((firebase.auth().isSignInWithEmailLink(window.location.href)) {
//     ui.start('#firebaseui-auth-container', uiConfig);
//   }

export {ui};