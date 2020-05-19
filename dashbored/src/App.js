import React, { useReducer } from 'react';
import { storeReducer, data, db, actions } from './Store'
import './App.scss';
import Dashbrd from './components/Main/Dashbrd'
import LoginForm from './components/LogIn/LoginForm';
import Setting from './components/Header/Settings'
import HeaderAuthIn from './components/Header/HeaderAuthIn'
import HeaderAuthOut from './components/LogIn/HeaderAuthOut'
import { useAuth } from './hooks'
function App() {
  const [state, dispatch] = useReducer(storeReducer, data);
  const user = useAuth();
  React.useMemo(() => {
    if (user !== null)
      dispatch({ type: actions.SetCurrentUser, CurrentUser: { email: user.email, avatar: user.photoURL, name: user.displayName, logged: true } });
  }, [user])

  return (
    <db.Provider value={{ state, dispatch }} >
      {(!state.CurrentUser.logged) && (
        <div className="LoggedOut" data-theme="web-large">
          <HeaderAuthOut />
          <LoginForm />
        </div>)}
      {(state.CurrentUser.logged) && (
        <div className="Sender-Render" data-theme="web-large">
          <HeaderAuthIn />
          {state.Settings.isSettings ? (<><Setting /></>) :
            (<>
              <Dashbrd user={user} state={state} dispatch={dispatch} />
            </>)}
        </div>)}
    </db.Provider>
  );
}
export default App;
