import React, { Component, Fragment } from 'react'
import { deleteRecipe } from '../RecipeAjax'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

class Recipe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipe: null,
      shouldRedirect: false,
      user: this.props.user
    }
  }

  componentDidMount () {
    console.log('recipe component mounted successfully')
    console.log('this is props after successfully mounting =========', this.props)
    const { id } = this.props.match.params
    const { user } = this.state
    console.log(this.props)
    axios({
      url: apiUrl + '/recipes/' + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(response => this.setState({
        recipe: response.data.recipe
      }))
      .catch(console.log)
  }

  // componentDidMount () {
  //   console.log('SHOW component successfully mounted')
  //   const id = this.match.params._id
  //   axios.get(`${apiUrl}/recipes/${id}`)
  //     .then(response => this.setState({
  //       recipe: response.data.recipe
  //     }))
  //     .catch(console.log)
  // }

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
    console.log(title, ingredient)
    return (
      <Fragment>
        <h4>{this.state.recipe.title}</h4>
        <p>Ingredients: {this.state.recipe.ingredient}</p>
        <button onClick={this.handleDelete}>DELETE</button>
        <Link to={this.props.match.url + '/edit'}>
          <button>EDIT</button>
        </Link>
      </Fragment>
    )
  }
}

export default Recipe
