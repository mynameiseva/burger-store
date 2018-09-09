import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addIngredientToBurger, removeIngredientFromBurger } from '../actions/index'
class BurgerForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BurgerNameInput onChange={this.handleBurgerName} />
      <CustomButton onClick={this.handleCreateBurger}>
        Create burger
        </CustomButton>
        {true &&
        <Fragment>
          <h1>{name}</h1>
          <p>{total}</p>
          <Idk
            name='Meat'
            ingredient='meat'
            amount={5}
            createIngredient={createIngredient}
            deleteIngredient={deleteIngredient}
          />
          <Idk
            name='Chesse'
            ingredient='chesse'
            amount={3}
            createIngredient={createIngredient}
            deleteIngredient={deleteIngredient}
          />
          <Idk
            name='Salad'
            ingredient='salad'
            amount={2}
            createIngredient={createIngredient}
            deleteIngredient={deleteIngredient}
          />
        </Fragment>
    }
    )
  }
}

export default connect((state, { burgerId }) => ({
  burger: state.burgers[burgerId],
}), { addIngredientToBurger, removeIngredientFromBurger })(BurgerForm)