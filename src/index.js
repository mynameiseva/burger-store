import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import BurgerView from './components/BurgerView'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/burger/:name' component={BurgerView} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
