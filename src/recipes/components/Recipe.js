import React, { Component, Fragment } from 'react'
// import { deleteRecipe } from '../RecipeAjax'
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
    const { id } = this.props.match.params
    const { user } = this.state
    axios({
      url: apiUrl + '/recipes/' + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(response => this.setState({
        recipe: response.data.recipe
      }))
      .catch(() => {
        this.props.alert('Something went wrong, please try again', 'danger')
      })
  }

  handleDelete = () => {
    const { id } = this.props.match.params
    const { user } = this.state

    return axios({
      url: apiUrl + '/recipes/' + id,
      method: 'DELETE',
      headers: { 'Authorization': `Token token=${user.token}` }
    })
      .then(() => {
        this.props.alert('Delete in progress...', 'primary')
      })
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => {
        this.props.alert('Recipe unsuccessfully deleted', 'danger')
      })
  }

  render () {
    const { recipe } = this.state

    if (!recipe) {
      return <Spinner animation="border" />
    }

    if (this.state.shouldRedirect) {
      return <Redirect to={{
        pathname: '/recipes', state: { message: 'Successfully deleted recipe!' }
      }}/>
    }

    return (
      <Fragment>
        <h4>{this.state.recipe.title}</h4>
        <p>Ingredients: {this.state.recipe.ingredient}</p>
        {this.state.recipe.owner === this.props.user._id ? (
          <Fragment>
            <button onClick={this.handleDelete}>DELETE</button>
            <Link to={this.props.match.url + '/edit'}>
              <button>EDIT</button>
            </Link>
          </Fragment>
        ) : ''}
      </Fragment>
    )
  }
}

export default Recipe
