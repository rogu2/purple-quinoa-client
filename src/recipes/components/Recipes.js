import React, { Component, Fragment } from 'react'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
// import Alert from 'react-bootstrap/Alert'
import { getRecipes, deleteRecipe } from '../RecipeAjax'
import Spinner from 'react-bootstrap/Spinner'

class Recipes extends Component {
  constructor () {
    super()

    this.state = {
      recipes: [],
      recipe: [],
      title: null,
      notes: null,
      ingredient: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    getRecipes(user)
      .then(response => {
        this.setState({ recipes: response.data.recipes })
      })
      .catch(() => {
        this.props.alert('Failed to load page', 'danger')
      })
  }

  handleDelete = () => {
    const { user, id } = this.props.match.params
    deleteRecipe(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => {
        this.props.alert('Recipe successfully deleted', 'primary')
      })
  }

  render () {
    const { recipes, recipe } = this.state

    if (recipe === null) {
      return <Spinner animation="border" />
    } else {
      return (
        <Fragment>
          <h4> Recipes: </h4>
          {recipes.map(recipe => (
            <ul key={recipe._id}>
              <li><Link to={'/recipes/' + recipe._id}>{recipe.title}</Link></li>
            </ul>
          ))}
        </Fragment>
      )
    }
  }
}
export default Recipes
