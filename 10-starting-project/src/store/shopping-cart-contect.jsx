import {createContext, useReducer} from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';


export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

function shopingCartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        ...state, // not needed here because we have only 1 value
        items: updatedItems,
      };
    }

    if(action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    return state;
}

export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shopingCartReducer, {
        items: [],
    });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
        type: 'ADD_ITEM',
        payload: id
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
        type: 'UPDATE_ITEM',
        payload: {
            productId: productId,
            amount: amount
        }
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  }

    // For below React version 19 we have to use  CartContext.Provider instaed of just CartContext
    // <CartContext></CartContext>
  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>
  
    {/* the default value set when creating the context is only used if a component that was not
    wrapped by the Provider componnet tries to access the component value  */}
}