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
    console.log('recipes component mounted')
    console.log('this.props currently is: ', this.props)
    const { user } = this.props
    getRecipes(user)
      .then(response => {
        this.setState({ recipes: response.data.recipes },
          console.log('after get recipes props======', this.state))
      })
      .catch(console.error)
  }

  handleDelete = () => {
    const { user, id } = this.props.match.params
    deleteRecipe(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(console.error)
  }

  render () {
    const { recipes, recipe } = this.state
    console.log('after render, this state is currently: ', this.state)

    console.log('after render, this state recipes is currently: ', this.state.recipes)

    console.log('after render, this state recipe is currently: ', this.state.recipe)

    if (recipe === null) {
      return <Spinner animation="border" />
    } else {
      const { title, notes, ingredient } = recipe
      console.log(title, notes, ingredient)
      return (
        <Fragment>
          <h4> Recipes: </h4>
          {recipes.map(recipe => (
            <ul key={recipe._id}>
              <li>
                <Link to={'/recipes/' + recipe._id}>{recipe.title}</Link>
              </li>
              {console.log('THIS IS THE RECIPE AFTER HITTING THE LINK', recipe._id)}
              <li>ingredient: {recipes.ingredient}</li>
              <li>notes: {recipes.notes}</li>
            </ul>
          ))}
        </Fragment>
      )
    }

    // data-id={recipe._id}
    // event.currentTarget.dataset.id

    // if (this.state.recipes.length === 0) {
    //   return <Spinner animation="border" />
    // }
    //
    // //
    // // if (this.state.recipe === null) {
    // //   return <p>{recipes.length === 0 ? <Alert variant="warning">{'No recipes to display'}</Alert> : ''}</p>
    // // }
    // console.log('recipes component render')
    // return (
    //   <Fragment>
    //     <h4> Recipes: </h4>
    //     {recipes.map(recipe => (
    //       <ul key={recipe._id}>
    //         <li>
    //           <Link to={'/recipes/' + recipe._id}>{recipe.title}</Link>
    //         </li>{console.log('THIS IS THE RECIPE AFTER HITTING THE LINK', recipe._id)}
    //         <li>ingredient: {recipes.ingredient}</li>
    //         <li>notes: {recipes.notes}</li>
    //         <li><button onClick={this.handleDelete}>DELETE</button></li>
    //         <li><button>EDIT</button></li>
    //       </ul>
    //     ))}
    //   </Fragment>
    // )
  }
}

export default Recipes

// <h4>Recipes: </h4>
// <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
// <ul>
//   {this.state.recipe.map(recipe => (

//   ))}
// </ul>
