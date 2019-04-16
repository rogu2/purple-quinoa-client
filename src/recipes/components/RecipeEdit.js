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
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/recipes/${id}`)
      .then(response => this.setState({
        recipe: response.data.recipe
      }))
      .catch(console.error)
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
    const id = this.state.recipe.id
    const { recipe } = this.state

    axios.patch(`${apiUrl}/recipes/${id}`, { recipe: this.state.recipe })
      .then(() => this.setState({ updated: true }))
      .catch(() => this.sestState({
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
        pathname: `/recipes/${this.state.recipe.id}`, state: { message: 'Successfully updated recipe!' }
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
