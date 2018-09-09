export const CREATE_BURGER = 'CREATE_BURGER'
export const createBurger = name => 
  ({ type: CREATE_BURGER, name })
 
export const DELETE_BURGER = 'DELETE_BURGER'
export const deleteBurger = name => 
  ({ type: DELETE_BURGER, name })

export const ADD_INGREDIENT_TO_BURGER = 'ADD_INGREDIENT_TO_BURGER'
export const addIngredientToBurger = (burgerId, ingredientId, amount = 1) =>
  ({ type: ADD_INGREDIENT_TO_BURGER, amount, burgerId, ingredientId})

export const REMOVE_INGREDIENT_FROM_BURGER = 'REMOVE_INGREDIENT_FROM_BURGER'
export const removeIngredientFromBurger = (burgerId, ingredientId) =>
  ({ type: REMOVE_INGREDIENT_FROM_BURGER, burgerId, ingredientId })

export const CREATE_INGREDIENT = 'CREATE_INGREDIENT'
export const createIngredient = (ingredient, amount) => 
  ({ type: CREATE_INGREDIENT, ingredient, amount })

export const DELETE_INGREDIENT = 'DELETE_INGRIDIENT'
export const deleteIngredient = (ingredient, amount) => 
  ({ type: DELETE_INGREDIENT, ingredient, amount })

