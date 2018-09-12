import { combineReducers } from 'redux'
import { omit, filter, assoc, lensProp, over, inc, dec } from 'ramda'
import {
  CREATE_BURGER,
  DELETE_BURGER,
  INCREMENT_INGREDIENT_OF_BURGER,
  DECREMENT_INGREDIENT_OF_BURGER
} from '../actions/index'


const ingredientsSample = {
  1: {
    id: 1,
    name: 'beacon',
    price: 5
  },
  2: {
    id: 2,
    name: 'cheese',
    price: 3
  },
  3: {
    id: 3,
    name: 'salad',
    price: 2
  }
}

const counter = startValue => {
  let start = startValue
  return () => start++
}

const next_id = counter(4)

const burgersSample = {
  1: {
    id: 1,
    name: 'Chesse Salad Burger',
    ingredients: {
      2: 3,
      3: 2,
      ordering: [2, 3]
    }
  },
  2: {
    id: 2,
    name: 'Beacon Burger',
    ingredients: {
      1: 2,
      3: 4,
      ordering: [1, 3]
    }
  },
  3: {
    id: 3,
    name: 'Beacon x2 Burger',
    ingredients: {
      1: 3,
      3: 4,
      ordering: [1, 3]
    },
  }
}

const initialState = {
  ingredients: ingredientsSample,
  burgers: burgersSample
}

const burgerReducer = (state = initialState, action) => {
  const { ingredientId, burgerId, type, name } = action
  switch (type) {
    case CREATE_BURGER: {
      const burger = {
        id: next_id(),
        name,
        ingredients: { ordering: [] }
      }

      return {
        ingredients: { ...state.ingredients },
        burgers: {
          ...state.burgers,
          [burger.id]: burger
        }
      }
    }
    case DELETE_BURGER:
      return {
        ingredients: { ...state.ingredients },
        burgers: omit(burgerId, state.burgers)
      }
    case INCREMENT_INGREDIENT_OF_BURGER: {
      const burger = state.burgers[burgerId]
      const burgerIngredients = ingredientId in burger.ingredients ?
        burger.ingredients : assoc(ingredientId, 0, burger.ingredients)

      const ingredients = over(lensProp(ingredientId), inc, burgerIngredients)

      return {
        ingredients: { ...state.ingredients },
        burgers: assoc(burgerId, { ...burger, ingredients }, state.burgers)
      }
    }
    case DECREMENT_INGREDIENT_OF_BURGER: {
      const burger = state.burgers[burgerId]

      const ingredients = filter(count => count > 0, over(lensProp(ingredientId), dec, burger.ingredients))

      return {
        ingredients: { ...state.ingredients },
        burgers: assoc(burgerId, { ...burger, ingredients }, state.burgers)
      }
    }
    default:
      return { ...state }
  }
}

export default combineReducers({
  creation: burgerReducer
})