import React, { Component, Fragment } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import { getRecipes } from '../RecipeAjax'
// import Spinner from 'react-bootstrap/Spinner'

class Recipes extends Component {
  constructor () {
    super()

    this.state = {
      recipes: [],
      recipe: null,
      title: null,
      notes: null,
      ingredient: null
    }
  }

  componentDidMount () {
    console.log('recipes component mounted')
    // let recipeData
    getRecipes(this.props.user)
      .then(response => { this.setState({ recipes: response.data.recipe }) })
      .catch(console.error)
  }

  render () {
    const { recipes } = this.state

    // const { title, notes, ingredient } = this.recipes
    // console.log(title, notes, ingredient)

    // if (this.state.recipes.length === 0) {
    //   return <Spinner animation="border" />
    // }
    //
    // if (recipes.length === null) {
    //   return <p>{recipes.length === 0 ? <Alert variant="warning">{'No recipes to display'}</Alert> : ''}</p>
    // }
    console.log('recipes component render')
    return (
      <Fragment>
        <h4> Recipes: </h4>
        {recipes.map(recipes => (
          <ul key={recipes._id}>
            <li>
              <Link to={'/recipes/' + recipes._id}>{recipes.title}</Link>
            </li>
            <li>ingredient: {recipes.ingredient}</li>
            <li>notes: {recipes.notes}</li>
          </ul>
        ))}
      </Fragment>
    )
  }
}

export default Recipes

// <h4>Recipes: </h4>
// <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
// <ul>
//   {this.state.recipe.map(recipe => (

//   ))}
// </ul>
