import { createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as actions from './authActions';

export const authStoreName = 'AuthStore';

export const authInitialState = {
  count: 1,
  isLogged: false,
}

export const authReducer = function(state = authInitialState, action) {
  switch (action.type) {
    case actions.LOGGEDIN: 
      console.log("LOGGEDIN action call with :", action );
      return {
        ...state,
        logged: true,
      }
    case actions.LOGGEDOUT:
      console.log("user has successfully logged out ");
      return {
        ...state,
        logged: false,
      }
    default: 
      console.log(authStoreName + ' has been called but no change has beeen made with the action : ' + action.type + 'and these data :', action);
      console.log('current state of the store : ', state);
      return {
        ...state,
      } 
  }
}

const authMigration1 = null;

const authMigrationConfig = {
  1: previousState => {
    console.log('received previousState for authReducer : ', previousState);
    return {
      logged: undefined,
    }
  }
}

const authMigration2 = createMigrate(authMigrationConfig, { debug: true });

export const authConfig = {
  key: authStoreName,
  version: 1,
  storage,
  migrate: authMigration2,
}