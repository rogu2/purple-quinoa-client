import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

class Recipe extends Component {
  constructor () {
    super()

    this.state = {
      movie: null,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/recipes/${id}`)
      .then(response => this.setState({
        recipe: response.data.recipe
      }))
      .catch(console.log)
  }

  handleDelete = () => {
    const id = this.props.match.params.id
    axios.delete(`${apiUrl}/recipes/${id}`)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.error)
  }

  render () {
    if (!this.state.recipe) {
      return <Spinner animation="border" />
    }

    if (this.state.shouldRedirect) {
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
