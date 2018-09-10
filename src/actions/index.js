export const CREATE_BURGER = 'CREATE_BURGER'
export const createBurger = name => 
  ({ type: CREATE_BURGER, name })
 
export const DELETE_BURGER = 'DELETE_BURGER'
export const deleteBurger = name => 
  ({ type: DELETE_BURGER, name })

export const INCREMENT_INGREDIENT_OF_BURGER = 'INCREMENT_INGREDIENT_OF_BURGER'
export const incrementIngredient = (burgerId, ingredientId) =>
  ({ type: INCREMENT_INGREDIENT_OF_BURGER, burgerId, ingredientId})

export const DECREMENT_INGREDIENT_OF_BURGER = 'DECREMENT_INGREDIENT_OF_BURGER'
export const decrementIngredient = (burgerId, ingredientId) =>
  ({ type: DECREMENT_INGREDIENT_OF_BURGER, burgerId, ingredientId })