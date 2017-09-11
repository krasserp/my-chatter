import * as chatApi from '../api'




export const SORT_COMMENTS_BY = 'SORT_COMMENTS_BY'
export const sortCommentsBy = (order) => ({
    type: SORT_COMMENTS_BY,
    order,
})



export const SORT_ITEMS_BY = 'SORT_ITEMS_BY'
export const sortItemsBy = (order) => ({
    type: SORT_ITEMS_BY,
    order,
})



export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_COMMENT_VOTE = 'SET_COMMENT_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export const setCommentVote = (id,voteScore) =>({
  type:SET_COMMENT_VOTE,
  id,
  voteScore
})

export const putCommentVote = (id,vote) => dispatch => (
  chatApi
    .commentVote(id,vote)
    .then((data)=>{
      dispatch(setCommentVote(data.id,data.voteScore))
    })

  )


export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
})

export const getCommentsById = (id) => dispatch => (
  chatApi
    .getPostIdComments(id)
    .then((comments)=>{
      dispatch(setComments(comments))
    })

  )


export const editComment = (id,comment) =>({
  type:EDIT_COMMENT,
  id,
  comment
})

export const updateComment= (id,data) => dispatch =>(
  chatApi
    .editComment(id,data)
    .then((data)=>{
      dispatch(editComment(id,data))
    })

  )

export const addComment = (comment) =>({
  type:ADD_COMMENT,
  comment
})

export const postComment = (comment) => dispatch => (
  chatApi
    .postComment(comment)
    .then((data)=>{
      console.log(data, ' comment return')
      dispatch(addComment(data))
    })

  )



export const SET_POST_VOTE = 'SET_POST_VOTE'
export const SET_ALL_POSTS = 'SET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'


export const editPost = (id,post) =>({
  type:EDIT_POST,
  id,
  post
})

export const updatePost = (id,data) => dispatch =>(
  chatApi
    .editPost(id,data)
    .then((data)=>{
      dispatch(editPost(id,data))
    })

  )


export const addPost = (post) =>({
  type:ADD_POST,
  post
})

export const postPost = (post) => dispatch => (
  chatApi
    .postPost(post)
    .then((data)=>{
      console.log(data, ' post return')
      dispatch(addPost(data))
    })

  )





export const setPostVote = (id,voteScore) =>({
  type:SET_POST_VOTE,
  id,
  voteScore
})

export const putPostVote = (id,vote) => dispatch => (
  chatApi
    .postVote(id,vote)
    .then((data)=>{
      dispatch(setPostVote(data.id,data.voteScore))
    })

  )

export const settAllPosts = (posts) => ({
    type: SET_ALL_POSTS,
    posts
})
export const fetchAllPosts = () => dispatch => (

    chatApi
        .getAllPosts()
        .then((posts)=>{
            dispatch(settAllPosts(posts))
        })
    )





export const SET_CATEGORY = 'SET_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'


/**
 * category stuff below
 *
 *
 */

export const setCategory = (name) => ({
    type: SET_CATEGORY,
    name
})


export const updateCategory = (categories) => ({
    type: UPDATE_CATEGORY,
    categories
})


export const fetchCategory = () => dispatch => (
        chatApi
            .getCats()
            .then((cats) => {
                let fetchedInitalState = cats.categories.map((item) => {
                      item['active'] = false
                      return item
                  })

                  fetchedInitalState.push({name:'all', path:'all',active:true});
                  dispatch(updateCategory(fetchedInitalState))
                }

            )


    )