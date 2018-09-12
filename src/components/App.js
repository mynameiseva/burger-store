import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CustomButton, Container, BurgerNameInput } from '../styled'
import { createBurger } from '../actions'
import BurgerForm from './BurgerForm'

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
    const { burgerIds } = this.props
    return (
      <Container>
        <BurgerNameInput onChange={this.handleBurgerName}/>
        <CustomButton onClick={this.handleCreateBurger}>
          Create burger
        </CustomButton>
        {burgerIds.map(id => <BurgerForm key={id} burgerId={id} />)}
      </Container>
    );
  }
}

export default connect(state => ({
  burgerIds: Object.keys(state.creation.burgers)
}), { createBurger })(App)
