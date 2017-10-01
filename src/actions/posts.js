import * as chatApi from '../api'
import {
        SET_POST_VOTE,
        SET_ALL_POSTS,
        ADD_POST,
        EDIT_POST,
        DELETE_POST } from './types'

export const deletePost = (id) =>({
  type:DELETE_POST,
  id
})

export const deletePostId = (id) => dispatch =>(
  chatApi
    .deletePost(id)
    .then(()=>{
      dispatch(deletePost(id))
    })

  )

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
