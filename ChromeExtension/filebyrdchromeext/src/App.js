import React , { useReducer, useEffect } from 'react';
import { StoreReducer, data, db, actions } from './store';
import firebase from './api/firebase'
import './App.css';

function App() {
    const [state, dispatch] = useReducer(StoreReducer, data)
  
    /*
    useEffect(() => {
        //Get the Firebase results
        const QEvents = snapshot => {
        }
        
        //Firebase Query
        firebase.ref("TopTen").orderByChild('total').limitToLast(10).on("value", QEvents);
        }, []);
    */
        return (
          <db.Provider value={{ state, dispatch }}>
            <div></div>
          </db.Provider>
        );
      }
      
      export default App;
        
