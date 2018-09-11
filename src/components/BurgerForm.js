import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import IngredientView from './IngredientView'
import { assoc } from 'ramda'
import {
  CustomButton,
  Container,
  BurgerNameInput
} from '../styled'

import {
  createBurger,
  deleteBurger,
  incrementIngredient,
  decrementIngredient,
  createIngredient,
  deleteIngredient
} from '../actions'

class BurgerForm extends Component {
  constructor(props) {
    super(props)
  }
  
  handleBurgerName = e =>
    this.setState({ burgerName: e.target.value })

  handleCreateBurger = () => {
    const { burgerName } = this.state
    if (burgerName.length > 0) {
      this.props.createBurger(burgerName)
    }
  }

  render() {
    const { incrementIngredient, decrementIngredient } = this.props

    const { ingredients } = this.props
    const { id, name, ingredients: burgerIngredients } = this.props.burger
    
    const burgerIngredientsList = Object.entries(burgerIngredients).reduce((list, [ingredientId, count]) => {
      if (count instanceof Array)
        return list
      
      return [...list, {count, ...ingredients[ingredientId]}]
    }, [])
    
    const burgerPrice = burgerIngredientsList.reduce((sum, {count, price}) => sum + count * price, 0)
    
    return (
      <Fragment>
        <BurgerNameInput onChange={this.handleBurgerName} />
        <h3>{name}</h3>
        {burgerIngredientsList.map(ingredient =>
          <IngredientView
            key={ingredient.id}
            {...ingredient}
            incrementIngredient={incrementIngredient}
            decrementIngredient={decrementIngredient}
          />)}
        <p>Burger price {burgerPrice}$</p>
      </Fragment>
    )
  }
}

export default connect((state, { burgerId }) => ({
  burger: state.creation.burgers[burgerId],
  ingredients: state.creation.ingredients,
}), (dispatch, { burgerId }) =>
  ({
    incrementIngredient: (...args) => dispatch(incrementIngredient(burgerId, ...args)),
    decrementIngredient: (...args) => dispatch(decrementIngredient(burgerId, ...args)),
  }))(BurgerForm)
