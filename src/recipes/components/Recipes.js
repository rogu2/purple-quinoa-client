import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'

class Recipes extends Component {
  constructor () {
    super()

    this.state = {
      recipes: []
    }
  }

  componentDidMount () {
    console.log('recipes component mounted')
    axios.get(apiUrl + '/recipes')
      .then(response => this.setState({
        recipes: response.data.recipes
      }))
      .catch(console.error)
  }

  render () {
    if (this.state.recipes.length === 0) {
      return <Spinner animation="border" />
    }
    console.log('recipes component render')
    return (
      <Fragment>
        <h4>Recipes: </h4>
        <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
        <ul>
          {this.state.recipe.map(recipe => (
            <li key={recipe.id}>
              <Link to={'/recipes/' + recipe.id}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default Recipes
