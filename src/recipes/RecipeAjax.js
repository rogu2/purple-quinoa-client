
import axios from 'axios'
import apiUrl from '../apiConfig.js'

export const getRecipes = (user) => {
  return axios({
    url: `${apiUrl}/recipes`,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const getRecipe = ({ user, match }) => {
  return axios({
    url: `${apiUrl}/recipes/${match.params.id}`,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const deleteRecipe = ({ user, match }) => {
  return axios({
    url: `${apiUrl}/recipes/${match.params.id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const createRecipe = ({ props, recipeData }) => {
  return axios({
    url: `${apiUrl}/recipes/`,
    method: 'POST',
    headers: { 'Authorization': `Token token=${props.user.token}` },
    data: {
      recipe: {
        title: recipeData.title,
        ingredient: recipeData.ingredient
      }
    }
  })
}

export const editRecipe = ({ props, recipeData }) => {
  return axios({
    url: `${apiUrl}/recipes/`,
    method: 'PATCH',
    headers: { 'Authorization': `Token token=${props.user.token}` },
    data: {
      recipe: {
        title: recipeData.title,
        ingredient: recipeData.ingredient
      }
    }
  })
}
