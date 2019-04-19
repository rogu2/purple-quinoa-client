# Purple Quinoa Client
# Welcome to Purple Quinoa Client (version 1)

 Have you ever had an experience where you walk into a grocery store and are unable
 to find the ingredient you need? Are you too proud to ask for help? Are you too
 stubborn to leave the grocery store defeated without the ingredients you need?

 Welcome to Purple Quinoa. The app which (in future versions) enables users
 create an account, to search ingredients, save them in a recipe and have that
 recipe render the location of the ingredients on a 2D map of the store.

 This Client uses HTML, SASS/CSS, and React JS. In its current state, it permits
 users to manage a user account and create, read, edit and delete recipes in text form.
 Users can see all recipes and are only able to update those they own.

 It should be noted that the ingredients routes are still in beta mode and intended
 for a future release. Please see the future version section below for detail.

 ## Project URLs
 + API Github: https://github.com/rogu2/purple-quinoa-api
 + Client Github: https://github.com/rogu2/purple-quinoa-client
 + Heroku: https://dashboard.heroku.com/apps/purple-quinoa-api
 + Client URL: https://rogu2.github.io/purple-quinoa-client/

 ## Getting involved
 Interested in playing with the code or contributing? Read on.

 #### Installing
 + Fork and clone the respository locally
 + Navigate to the respository locally and run npm install
 + To test locally, run nodemon server.js
 + You will also need to set up the Purple Quinoa API. See further installation
 instructions on its repo: https://github.com/2jar/purple-quinoa-api

## Technologies Used:
 + React JS
 + HTML
 + CSS/SASS
 + React Bootstrap
 + React Router Dom
 + Axios (for Ajax)

 #### Wireframes: https://imgur.com/gallery/7ZEAyfA

 #### Screenshot:
 ![image](https://user-images.githubusercontent.com/38527493/56423917-2227a100-627c-11e9-9c08-167257c2ba0b.png)

## Development Process
#### Personal story:
 This is Purple Quinoa v1 which allows users to compile recipes of text entered
 ingredients and edit/delete to their descretion. A future release of this app
 will also permit users to add notes to their recipes as text.

 I conceived of this app after exploring Idywilde Farms (Acton, MA) looking for
 an ingredient called purple quinoa and could not look at it. I had a feeling I
 was in the right location, however, for one reason or another, I simply could
 not find it. It dawned on me that I must not be alone (or at least I certainly
 hope not!).

 Development began with considering the ERD, the API models and routes. I spent
 a significant amount of time modifying and adjusting the API to have it conform
 to its ideal future state.

 After satisfying curl scripts on the API I then turned to developing the front
 end and quickly realized that I over-designed the API which lead to refactoring.
 Following this I completed the front end client using React JS to reach a mvp
 state.

 In future versions, this app may provide a super-user auth path for store owners
 to modify their ingredient list and location. The ingredient model in the future
 will allow for Row and Column entries to be designated in the database to
 coorespond with the client to render the coordinates visually.

 #### User Stories
 + As a user I would like to:
 - Sign-in, sign-up, change password, and sign out.
 + While signed in:
 - Create a recipe
 - See all recipes
 - See an individual recipe
 - Edit my recipe
 - Delete my recipe

 #### Future State
 - Styling (in progress)
 - Allow users to add notes to recipes (in progress)
 - Separate Axios requests into a separate file (in progress)
 - Allow users to search for ingredients
 - Allow users to store ingredients pre-seeded from the database in a recipe.
 - Render ingredients that are stored in memories on a 2D map layout of the store.
 - Allow users to store recipes privately
 - Allow users to publish recipes for general viewing
 - Allow super-auth for store owners to modify their ingredient database.

  Link to Entity Relationship Diagram (ERD).


 API Github: https://github.com/rogu2/purple-quinoa-api
 Client Github: https://github.com/rogu2/purple-quinoa-client
 Heroku: https://dashboard.heroku.com/apps/purple-quinoa-api
 Client URL: https://rogu2.github.io/purple-quinoa-client/

 ## API Routes (for reference)
 |-----------------------------------------------------------|
 | Verb   | URI Pattern              | Controller#Action     |
 |--------|--------------------------|-----------------------|
 | POST   | `/sign-up`               | `users#signup`        |
 | POST   | `/sign-in`               | `users#signin`        |
 | DELETE | `/sign-out`              | `users#signout`       |
 | PATCH  | `/change-password`       | `users#changepw`      |
 |--------|--------------------------|-----------------------|
 | GET    | `/recipes`               | `recipes#index`       |
 | GET    | `/recipes/:id`           | `recipes#show`        |
 | POST   | `/recipes`               | `recipes#create`      |
 | DELETE | `/recipes/:id`           | `recipes#destroy`     |
 | PATCH  | `/recipes/:id`           | `recipes#update`      |
 |--------|--------------------------|-----------------------|
 | Verb   | (Still in beta)          | (Still in beta)       |
 | GET    | `/ingredients`           | `ingredients#index`   |
 | GET    | `/ingredients/:id`       | `ingredients#show`    |
 | POST   | `/ingredients`           | `ingredients#create`  |
 | DELETE | `/ingredients/:id`       | `ingredients#destroy` |
 | PATCH  | `/ingredients/:id`       | `ingredients#update`  |
 |-----------------------------------------------------------|

 ## License
 All content is licensed under a CC­BY­NC­SA 4.0 license.
 All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact rguempel@gmail.com.

 ## Acknowledgments
 Special thanks to Jennifer Meade, Erica Salling, Ben Jenkins, Toni Langley, Jordan Allain, Caleb Pearce, Naida Rosenberger, GA WDI-30, and everyone at General Assembly Boston.
