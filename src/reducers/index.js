import { combineReducers } from 'redux'
import { reject, omit, filter, prepend, assoc, lens, lensProp, prop, over } from 'ramda'
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
    ingredients: {
      2: 3, // ingredientId: count
      3: 2,
      ordering: [2, 3],
    },
  },
  2: {
    id: 2,
    name: 'doublekoreshburg',
    ingredients: {
      1: 2,
      3: 4,
      ordering: [1, 3],
    },
  },
  3: {
    id: 3,
    name: 'Tripple Beacon Koreshburg',
    ingredients: {
      1: 3,
      3: 4,
      ordering: [1, 3],
    },
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
        ingredients: { ordering: [] },
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
      //todo::
      const ingredientLens = lens(prop(ingredientId, { ingredientId: 0 }), assoc(ingredientId))
      console.log(ingredientLens(burger.ingredients), 'APPLY LENS')
      const ingredients = over(ingredientLens, count => count + 1, burger.ingredients)

      return {
        ingredients: { ...state.ingredients },
        burgers: assoc(burgerId, { ...burger, ingredients }, state.burgers),
      }
    }
    case DECREMENT_INGREDIENT_OF_BURGER: {
      const burger = state.burgers[burgerId]

      const ingredients = over(lensProp(burgerId), count => count - 1, burger.ingredients)
      const filteredIngredients = filter(count => count <= 0, burger.ingredients)

      return {
        ingredients: { ...state.ingredients },
        burgers: assoc(burgerId, { ...burger, ...filteredIngredients }, state.burgers),
      }
    }
    default:
      return { ...state }
  }
}

export default combineReducers({
  creation: burgerReducer
})