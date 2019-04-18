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
        id: this.props.match.params.id
      },
      shouldRedirect: false,
      updated: false,
      message: null
    }
  }

  componentDidMount () {
    console.log('recipe component mounted successfully')
    console.log('this is props after successfully mounting =========', this.props)
    const { id } = this.props.match.params
    // const { id } = this.state
    // const { user } = this.props
    console.log(this.props)
    axios({
      url: apiUrl + '/recipes/' + id,
      method: 'GET',
      headers: { 'Authorization': `Token token=${this.props.user.token}` },
      data: { recipe: this.state.recipe }
    })
      .then(response => this.setState({
        recipe: response.data.recipe
      }, console.log('THIS IS THE UPDATE STATE', this.state)))
      .catch(console.log)
  }

  handleChange = event => {
    // console.log('event target is', event.target.name, event.target.value)
    console.log('this state recipe', this.state.recipe)

    this.setState({ recipe: {
      ...this.state.recipe, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { id } = this.props.match.params
    // const id = this.state.recipe.id
    const { user } = this.props
    // const id = this.state.recipe.id
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

    const { title, ingredient, notes } = this.state.recipe
    return (
      <RecipeForm
        title={title}
        ingredient={ingredient}
        notes={notes}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default RecipeEdit
