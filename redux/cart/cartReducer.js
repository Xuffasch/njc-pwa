
import { createMigrate } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import storage from 'redux-persist/lib/storage';

import * as actions from './cartActions';

export const cartStoreName = 'cartStore';

export const cartInitialState = {
  content: [0],
};

export const cartReducer = function(state = cartInitialState, action) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      console.log('Add to cart : ', action.payload.item);
      return {
        ...state,
        content: [...state.content, action.payload.item],
      }
    case actions.REMOVE_FROM_CART:
      console.log('Remove from cart : ', action.payload.item);
      return {
        ...state,
        content: state.content.filter( cart_item => cart_item.id != action.payload.item),
      }
    case actions.UPDATE_ITEM_QTY: 
      console.log('Update qty for item : ', action.payload.item);
      return {
        ...state,
        cart: state.content.map(cart_item => {
          return (cart_item.id == action.payload.item.id) 
            ? action.payload.item : cart_item
        })
      }
    default:
      console.log(cartStoreName + ' has been called but no change has beeen made with the action : ' + action.type + 'and these data :', action);
      console.log('current state of the store : ', state);
      return {
        ...state
      }
  }
};

const cartMigration1 = null;

const cartMigrationConfig = {
  15: previousState => {
    console.log("received previousState for cartReducer: ", previousState);
    return {
      items: undefined,
      content: [previousState.items[0] + 3],
    }
  }
}

const cartMigration2 = createMigrate(cartMigrationConfig, { debug: true });

export const cartConfig = {
  key: cartStoreName,
  version: 15,
  storage,
  migrate: cartMigration2,
};




