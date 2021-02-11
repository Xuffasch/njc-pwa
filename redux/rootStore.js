import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { cartInitialState, cartConfig, cartReducer } from './cart/cartReducer';
import { authInitialState, authConfig, authReducer } from './auth/authReducer';

import { useMemo } from 'react';

const combinedReducers = combineReducers({
  cart: persistReducer(cartConfig, cartReducer),
  auth: persistReducer(authConfig, authReducer)
})

const initialRootState = {
  cart: {
    ...cartInitialState
  },
  auth: {
    ...authInitialState
  }
}

function initStore(preloadedState = initialRootState) {
  return createStore(
    combinedReducers,
    preloadedState,
  )
}

let rootStore;

export const initializeStore = (preloadedState) => {
  let _rootStore = rootStore ?? initStore(preloadedState);

  if (preloadedState && rootStore) {
    _rootStore = initStore({
      ...rootStore.getState(),
      ...preloadedState
    })

    rootStore = undefined
  }

  if (typeof window === 'undefined') return _rootStore;

  if (!rootStore) rootStore = _rootStore;

  return _rootStore;
}

export function useStore(initialState) {
  const store = useMemo( () => initializeStore(initialState), [initialState]);

  return { store }
}

