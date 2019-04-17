import React, { Component, Fragment } from 'react'
import { getRecipes, deleteRecipe } from '../RecipeAjax'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

class Recipe extends Component {
  constructor () {
    super()

    this.state = {
      recipe: null,
      shouldRedirect: false
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

  handleDelete = () => {
    // const id = this.props.match.params.id
    deleteRecipe()
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.error)
  }

  render () {
    const { recipe } = this.state

    if (!recipe) {
      return <Spinner animation="border" />
    }

    if (recipe.shouldRedirect) {
      return <Redirect to={{
        pathname: '/recipes', state: { message: 'Successfully deleted recipe!' }
      }}/>
    }

    const { title, ingredient } = this.state.recipe
    return (
      <Fragment>
        <h4>{title}</h4>
        <p>Ingredients: {ingredient}</p>
        <button onClick={this.handleDelete}>DELETE</button>
        <Link to={this.props.match.url + '/edit'}>
          <button>EDIT</button>
        </Link>
      </Fragment>
    )
  }
}

export default Recipe
