import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router'
// import Spinner from 'react-bootstrap/Spinner'
// import Alert from 'react-bootstrap/Alert'
import RecipeForm from './RecipeForm'
// import { createRecipe } from '../RecipeAjax'

class RecipeCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipe: {
        title: '',
        ingredient: '',
        notes: ''
      },
      user: props.user,
      created: false,
      message: null
    }
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
    const { recipe } = this.state

    axios({
      url: `${apiUrl}/recipes`,
      method: 'post',
      headers: { 'Authorization': `Token token=${this.state.user.token}` },
      data: { recipe: this.state.recipe }
    })
    // createRecipe(this.props.user)
      .then(response => this.setState({
        created: true,
        recipe: response.data.recipe
      }))
      .catch(() => this.setState({
        recipe: { ...recipe, title: '', ingredient: '' },
        message: 'Failed to create a recipe. Please try again.'
      }))
  }

  render () {
    const { recipe, created, message } = this.state

    if (created) {
      return <Redirect to={{
        pathname: `/recipes/${this.state.recipe.id}`, state: { message: 'Successfully created recipe!' }
      }}/>
    }

    const { title, ingredient, notes } = recipe
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

export default RecipeCreate
