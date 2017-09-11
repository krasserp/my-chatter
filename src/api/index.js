import axios from 'axios'
const api = "http://localhost:5001"


// unique token for posts

let token = localStorage.token

if(!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const getHeaders = {
    method: 'GET',
    headers :
    {
        'Accept': 'application/json',
        'Authorization' : token
    }
}

const postHeaders =
    {
        'Authorization' : token,
        'Content-Type': 'application/json',
    }


//getting

export const getCats = () =>
    fetch(`${api}/categories`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)

export const getAllPosts = () =>
    fetch(`${api}/posts`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)

export const getCatPosts = (cat) =>
    fetch(`${api}/${cat}/posts`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)

export const getPostById = (id) =>
    fetch(`${api}/posts/${id}`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)

export const getPostIdComments = (id) =>
    fetch(`${api}/posts/${id}/comments`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)

export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, getHeaders)
        .then((resp) => resp.json())
        .then(data => data)




// setting
export const postPost = (pBody) =>
    fetch(`${api}/posts`,{
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)

export const postVote = (id,pBody) =>
    fetch(`${api}/posts/${id}`,{
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)

export const editPost = (id,pBody) =>
    fetch(`${api}/posts/${id}`,{
            method: 'PUT',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)

// Delete not working not sure what needs to be added or removed,...
export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`,{
            method: 'DELETE',
            headers: postHeaders,
            body: JSON.stringify({'id': id})
            }
        )
        .then((resp) => {console.log(resp); return resp.json()})


export const postComment = (pBody) =>
    fetch(`${api}/comments`,{
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)

export const commentVote = (id,pBody) =>
    fetch(`${api}/comments/${id}`,{
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)



export const editComment = (id,pBody) =>
    fetch(`${api}/comments/${id}`,{
            method: 'PUT',
            headers: postHeaders,
            body: JSON.stringify(pBody)
            }
        )
        .then((resp) => {return resp.json()})
        .then(data => data)

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`,{
            method: 'DELETE',
            headers: postHeaders,
            body: JSON.stringify({'id': id})
            }
        )
        .then((resp) => {console.log(resp); return resp.json()})