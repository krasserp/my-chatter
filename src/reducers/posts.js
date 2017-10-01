import {
    SET_ALL_POSTS,
    SET_POST_VOTE,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
} from '../actions/types'

const initPosts = [
    { author:"PKK",
        body:"Everyone says so after all.",
        category:"oida",
        deleted:false,
        id:"asdf",
        timestamp:1467166872634,
        title:"Udacity is the best place to learn React",
        voteScore:6}
]


export const posts = (state=initPosts, action) => {

    const {posts, id, voteScore, post} = action
    let newState
    switch(action.type){

        case SET_ALL_POSTS:
            return posts

        case SET_POST_VOTE:
            newState = state.map((item)=>{
                if(item.id === id){
                    item.voteScore = voteScore
                }
                return item
            })
            return newState

        case ADD_POST:
            newState = state.concat(post)
            return newState

        case EDIT_POST:
            newState = state.map((item)=>{
                if(item.id === id){
                    item = post
                }

                return item
            })
            return newState

        case DELETE_POST:
            newState = state.map((item)=>{
                if(item.id === id){
                    item.deleted = true
                }
                return item
            })

            return newState

        default:
            return state
    }
}


