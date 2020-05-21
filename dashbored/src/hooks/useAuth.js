import React from 'react';
import { firebase } from '../API/firebase';
import { fixEmail } from '../utils'
const useAuth = () => {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser
    return user
  });
  function onChange(user) {
    setState(user)
  }
  React.useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return state
}

export default useAuth;