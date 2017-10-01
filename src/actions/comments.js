import * as chatApi from '../api'
import {SORT_COMMENTS_BY,
        SORT_ITEMS_BY,
        SET_COMMENTS,
        SET_COMMENT_VOTE,
        ADD_COMMENT,
        EDIT_COMMENT,
        DELETE_COMMENT} from './types'


export const sortCommentsBy = (order) => ({
    type: SORT_COMMENTS_BY,
    order,
})


export const sortItemsBy = (order) => ({
    type: SORT_ITEMS_BY,
    order,
})

export const deleteComment = (id) =>({
  type:DELETE_COMMENT,
  id
})

export const deleteCommentId = (id) => dispatch =>(
  chatApi
    .deleteComment(id)
    .then(()=>{
      dispatch(deleteComment(id))
    })

  )

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