import actions from './actions'
import db from './db'
import storeReducer from './storeReducer'
import data from './data';
import fauth, { authContext } from './auth'
import { firebase } from '../API/firebase';
import { documents } from './documents'
export { actions, db, data, storeReducer, fauth, authContext, firebase, documents }