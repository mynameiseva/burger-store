import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CustomButton } from '../styled'
import { Link } from 'react-router-dom'

class BurgerView extends Component {
  render() {
    const { name: currentBurger } = this.props.match.params
    const { burgers, ingredients } = this.props
    
    const currentBurgerValues = Object.values(burgers).find(({ name }) => name === currentBurger)
    const {ingredients: currentIngredients} = currentBurgerValues

    const burgerIngredientsList = Object.entries(currentIngredients)
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
        <h3>Burger name: {currentBurger}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {burgerIngredientsList.map(({name, price, count}, i) => 
            <li key={i}>
              {name}{price && `: price: ${price}$`}{count && `, count: ${count}`}
            </li>  
          )}
        </ul>
        <h4>Total price: {burgerPrice}</h4>
        <Link to={'/'}>
          <CustomButton>
            Back to main page
          </CustomButton>
        </Link>
      </Fragment>
    )
  }
}

export default connect(state => ({
  burgers: state.creation.burgers,
  ingredients: state.creation.ingredients
}))(BurgerView)
