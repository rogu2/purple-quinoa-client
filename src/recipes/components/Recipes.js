import React, { Component, Fragment } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// import { Link } from 'react-router-dom'
import { getRecipes } from '../RecipeAjax'
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
    let recipeData
    getRecipes(this.props.user)
      .then(response => {
        recipeData = response.data.recipes
        this.setState({
          recipes: recipeData
        })
      })
      .catch(console.error)
  }

  render () {
    const { recipes } = this.state

    if (recipes.length === 0) {
      return <Spinner animation="border" />
    }
    console.log('recipes component render')
    return (
      <Fragment>
        <h1> Placeholder </h1>
      </Fragment>
    )
  }
}

export default Recipes

// <h4>Recipes: </h4>
// <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
// <ul>
//   {this.state.recipe.map(recipe => (
//     <li key={recipe.title}>
//       <Link to={'/recipes/' + recipe.id}>{recipe.title}</Link>
//     </li>
//   ))}
// </ul>
