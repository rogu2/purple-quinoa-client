
import axios from 'axios'
import apiUrl from '../apiConfig.js'

export const getRecipes = (user) => {
  return axios({
    url: apiUrl + '/recipes',
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const getRecipe = ({ id, user }) => {
  return axios({
    url: apiUrl + '/recipes/' + id,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const deleteRecipe = ({ user, id }) => {
  return axios({
    url: `${apiUrl}/recipes/${id}`,
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
      recipes: {
        title: recipeData.title,
        ingredient: recipeData.ingredient,
        notes: recipeData.notes
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
      recipes: {
        title: recipeData.title,
        ingredient: recipeData.ingredient,
        notes: recipeData.notes
      }
    }
  })
}
