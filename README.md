
# React Redux Udacity course work
create-react-app was used to bootstrap your project

## Set up:
Dependency is to have this local server installed and running
https://github.com/udacity/reactnd-project-readable-starter


## Installation
- Clone this repo
- Install packages: `npm install`
- Run the app :`npm start`

## Requirements

### Views
The application should have, at a minimum, four views:
#### Default
- should list all available categories, which should link to a category view for that category
- should list all of the posts ordered by voteScore (highest score first)
- should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
- should have a control for adding a new post

#### Category View
- identical to the default view, but filtered to only include posts with the selected category

#### Post Detail View
- should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
should list all of the comments for that post, ordered by voteScore (highest first)
- should have a control for reordering comments by score or timestamp
- should have controls to edit or delete the post
- should have a control to add a new comment.
- implement comment form however you want (modal in this case)
- comments should also have controls for editing or deleting

#### Create/Edit View
- should have a form to create new post or edit existing posts
when editing, existing data should be populated in the form

#### Post/Comment UI
- Posts and comments, in all views where they are displayed, should display their current score and should have controls to increment or decrement the voteScore for the object.

- Posts should display the number of comments associated with the post.
Specific Requirements

#### Use React to build your application UI. 


- While the focus (and specification) of this project is based on functionality, rather than styling, please ensure that your app is presentable and easy to navigate.

#### Use Redux to manage your application state.

