import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Recipe from './recipes/components/Recipe'
import Recipes from './recipes/components/Recipes'
import RecipeEdit from './recipes/components/RecipeEdit'
import RecipeCreate from './recipes/components/RecipeCreate'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    const { alerts } = this.state

    this.setState({ alerts: [...alerts, { message, type }] })

    // clears all alerts after 2 seconds
    setTimeout(() => {
      this.setState({ alerts: [] })
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/recipes' render={() => (
            <Recipes alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes-create' render={() => (
            <RecipeCreate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes/:id' render={({ match }) => (
            <Recipe alert={this.alert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/recipes/:id/edit' render={({ match }) => (
            <RecipeEdit alert={this.alert} match={match} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
