import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router'
import RecipeForm from './RecipeForm'

import Spinner from 'react-bootstrap/Spinner'
// import Alert from 'react-bootstrap/Alert'

class RecipeEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipe: {
        title: '',
        ingredient: '',
        notes: '',
        id: this.props.match.params.id
      },
      shouldRedirect: false,
      updated: false,
      message: null
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    axios({
      url: apiUrl + '/recipes/' + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${this.props.user.token}` },
      data: { recipe: this.state.recipe }
    })
      .then(response => this.setState({
        recipe: response.data.recipe
      }))
      .catch(console.error)
  }

  handleChange = event => {
    this.setState({ recipe: {
      ...this.state.recipe, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { id } = this.props.match.params
    const { user } = this.props
    const { recipe } = this.state

    axios({
      url: apiUrl + '/recipes/' + id,
      method: 'PATCH',
      headers: { 'Authorization': `Token token=${user.token}` },
      data: {
        recipe: {
          title: recipe.title,
          ingredient: recipe.ingredient,
          notes: recipe.notes
        }
      }
    })
    // axios.patch(`${apiUrl}/recipes/${id}`, { recipe: this.state.recipe })
      .then(() => this.setState({ updated: true }))
      .catch(() => this.setState({
        recipe: { ...recipe, title: '', ingredient: '' },
        message: 'Update failed. Please try again.'
      }))
  }

  render () {
    const { recipe, updated, message } = this.state

    if (!recipe) {
      return <Spinner animation="border" />
    }

    if (updated) {
      return <Redirect to={{
        pathname: '/recipes', state: { message: 'Successfully updated recipe!' }
      }}/>
    }

    const { title, ingredient } = this.state.recipe
    return (
      <RecipeForm
        title={title}
        ingredient={ingredient}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default RecipeEdit
