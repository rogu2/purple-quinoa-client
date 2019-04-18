import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <NavLink to="/recipes" exact activeClassName="active-route">My Recipes</NavLink>
    <NavLink to="/recipes-create" exact activeClassName="active-route">Add a recipe!</NavLink>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Welcome to Purple Quinoa!</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
