import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CustomButton } from '../styled'
import IngredientView from './IngredientView'
import { 
  incrementIngredient, 
  decrementIngredient, 
  deleteBurger
 } from '../actions/index'

class BurgerForm extends Component {
  constructor(props) {
    super(props)
    this.state = { isMenuOpen: false }
  }

  openIngredientsMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })

  render() {
    const { incrementIngredient, decrementIngredient, deleteBurger, ingredients } = this.props
    const { name, ingredients: burgerIngredients } = this.props.burger
    
    const availableIngredient = Object.keys(ingredients)
      .filter(id => !(id in burgerIngredients))
      .map(id => ingredients[id])

    const burgerIngredientsList = Object.entries(burgerIngredients)
      .reduce((list, [ingredientId, count]) => {
        if (count instanceof Array)
          return list
        return [...list, { count, ...ingredients[ingredientId] }]
      }, [])

    const burgerPrice = burgerIngredientsList.reduce((sum, { count, price }) => {
      return sum + count * price
    }, 0)
    
    return (
      <Fragment>
          <h3>
            <Link to={`/burger/${name}`}>
              {name} 
            </Link>
            <CustomButton 
              onClick={deleteBurger} 
              color='secondary'>
              DELETE
            </CustomButton>
          </h3>
        {burgerIngredientsList.map(ingredient =>
          <IngredientView
            key={ingredient.id}
            {...ingredient}
            incrementIngredient={incrementIngredient}
            decrementIngredient={decrementIngredient}
          />)}
        <CustomButton onClick={this.openIngredientsMenu}>
          Add ingredients
        </CustomButton>
        {this.state.isMenuOpen && availableIngredient.map(ingredient =>
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
  ingredients: state.creation.ingredients
}), (dispatch, { burgerId }) =>
  ({
    deleteBurger: () => dispatch(deleteBurger(burgerId)),
    incrementIngredient: (...args) => dispatch(incrementIngredient(burgerId, ...args)),
    decrementIngredient: (...args) => dispatch(decrementIngredient(burgerId, ...args)),
  }))(BurgerForm)