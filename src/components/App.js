import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Idk from './idk'
import {
  CustomButton,
  Container,
  BurgerNameInput
} from '../styled'
import {
  createBurger,
  deleteBurger,
  createIngredient,
  deleteIngredient
} from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { burgerName: '' }
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
    const { name, total } = this.props.burger
    const { createIngredient, deleteIngredient } = this.props
    return (
      <Container>
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
          </Fragment>}
      </Container>
    );
  }
}

export default connect(state => ({
  burger: state.burger
}), { createBurger, deleteBurger, createIngredient, deleteIngredient })(App)
