import React, { Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'

const RecipeForm = ({ message, title, ingredient, notes, handleChange, handleSubmit }) => (

  <Fragment>
    { message && <Alert variant="danger" dismissible>{message}</Alert> }
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input placeholder={title} value={title} name="title" onChange={handleChange} />

      <label htmlFor="ingredient">Ingredient</label>
      <input placeholder={ingredient} value={ingredient} name="ingredient" onChange={handleChange} />

      <label htmlFor="ingredient">Notes</label>
      <input placeholder={ingredient} value={notes} name="notes" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  </Fragment>
)

export default RecipeForm
