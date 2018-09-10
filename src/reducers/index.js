import { combineReducers } from 'redux'
import { reject, omit, prepend, update } from 'ramda'
import {
  CREATE_BURGER,
  DELETE_BURGER,
  INCREMENT_INGREDIENT_OF_BURGER,
  DECREMENT_INGREDIENT_OF_BURGER,
  CREATE_INGREDIENT,
  DELETE_INGREDIENT
} from '../actions/index'


const ingredientsSample = {
  1: {
    id: 1,
    name: 'beacon',
    price: 5,
  },
  2: {
    id: 2,
    name: 'cheese',
    price: 3,
  },
  3: {
    id: 3,
    name: 'salad',
    price: 2,
  }
}

const next_id_abstract_factory_bean = (start_value) => {
  let start = start_value

  return () => start++
}

const next_id = next_id_abstract_factory_bean(4)

const burgersSample = {
  1: {
    id: 1,
    name: 'singlekoreshburg',
    ingredients: [
      { count: 3, ingredientId: 2 },
      { count: 2, ingredientId: 3 },
    ],
  },
  2: {
    id: 2,
    name: 'doublekoreshburg',
    ingredients: [
      { count: 2, ingredientId: 1 },
      { count: 4, ingredientId: 3 },
    ],
  },
  3: {
    id: 3,
    name: 'Tripple Beacon Koreshburg',
    ingredients: [
      { count: 3, ingredientId: 1 },
      { count: 4, ingredientId: 3 },
    ],
  },
}

const initialState = {
  ingredients: ingredientsSample,
  burgers: burgersSample,
}


const burgerReducer = (state = initialState, action) => {
  const {
    ingredientId, //
    burgerId, //
    type, // 
    amount, //
    name // shared by both ingredients and burgers
  } = action
  // add increment/decrement ingredient
  // replace array specific ramda functions to object specific
  // remove zero-count ingredients from burger (for viewing & storing)
  switch (type) {
    case CREATE_BURGER: {
      const burger = {
        id: next_id(),
        name,
        ingredients: [],
      }

      return {
        ingredients: { ...state.ingredients },
        burgers: {
          ...state.burgers,
          [burger.id]: burger,
        },
      }
    }
    case DELETE_BURGER:
      return {
        ingredients: { ...state.ingredients },
        burgers: omit(burgerId, state.burgers),
      }
    case INCREMENT_INGREDIENT_OF_BURGER: {
      const burger = state.burgers[burgerId]
      const ingredients = prepend({ count: amount, ingredientId }, burger.ingredients)

      return {
        ingredients: { ...state.ingredients },
        burgers: update(burgerId, { ...state.burgers[burgerId], ingredients }, state.burgers),
      }
    }
    case DECREMENT_INGREDIENT_OF_BURGER: {
      const burger = state.burgers[burgerId]
      const ingredients = reject(i => i.ingredientId === ingredientId, burger.ingredients)

      return {
        ingredients: { ...state.ingredients },
        burgers: update(burgerId, { ...burger, ingredients }, state.burgers),
      }
    }
    default:
      return { ...state }
  }
}

export default combineReducers({
  creation: burgerReducer
})