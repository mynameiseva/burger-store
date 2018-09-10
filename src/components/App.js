import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import BurgerForm from './BurgerForm'
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

  render() {
    const { burgerIds } = this.props
    return (
      <Container>
        {burgerIds.map(id => <BurgerForm burgerId={id} />)}
      </Container>
    );
  }
}

export default connect(state => ({
  burgerIds: Object.keys(state.creation.burgers)
}), null)(App)
