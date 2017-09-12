import {combineReducers} from 'redux'
import {SET_CATEGORY,
    UPDATE_CATEGORY,
    SET_ALL_POSTS,
    SORT_ITEMS_BY,
    SET_COMMENTS,
    SET_POST_VOTE,
    SET_COMMENT_VOTE,
    SORT_COMMENTS_BY,
    ADD_POST,
    EDIT_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_POST,
    DELETE_COMMENT
} from '../actions'



const initSortOrder = [

    {map: 'timestamp', active: false, order: ''},
    {map: 'voteScore', active: true, order: '-'}

]


const sortOrder = (state=initSortOrder, action) => {
    const {order} = action
    switch(action.type){
        case SORT_ITEMS_BY:
            return order
        default:
            return state
    }
}



const initCommentsOrder = [

    {map: 'timestamp', active: false, order: ''},
    {map: 'voteScore', active: true, order: '-'}

]


const commentsOrder = (state=initCommentsOrder, action) => {
    const {order} = action
    switch(action.type){
        case SORT_COMMENTS_BY:
            return order
        default:
            return state
    }
}



const initComments = {
    "894tuq4ut84ut8v4t8wun89g":
        {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
      }
    }




const comments = (state=initComments, action) => {
    const {comments,id,voteScore,comment} = action

    let newState,stateToArr
    switch(action.type){

        case ADD_COMMENT:
        case EDIT_COMMENT:
            newState = {...state}
            newState[comment.id] = comment
            return newState

        case SET_COMMENT_VOTE:
            stateToArr=[]
            newState = {}
            for(let c in state){
                stateToArr.push(state[c])
            }

            stateToArr.map((item)=>{
                if(item.id === id){
                    item.voteScore = voteScore
                }
                newState[item.id] = item
                return item
            })
            return newState

        case SET_COMMENTS:

            newState = {...state}

            comments.forEach((item)=>{
                newState[item.id] = item
            })

            return newState

        case DELETE_COMMENT:

            newState = {...state}
            newState[id]['deleted'] = true


            return newState


        default:
            return state
    }
}


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



const posts = (state=initPosts, action) => {

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



const initialCategoriesState = [

        {name: 'react',  path: 'react',    active: false},
        {name: 'redux',  path: 'redux',    active: false},
        {name: 'udacity',path: 'udacity',  active: false},
        {name: 'all',    path: 'all',      active: true},

    ]


const categories = (state=initialCategoriesState, action) => {
        const {name} = action
        switch(action.type){

            case SET_CATEGORY:

                let newState = state.map( (item) => {

                        item.active = item.name === name ? true : false

                        return item
                    })

                return newState


                case UPDATE_CATEGORY:
                    return action.categories

            default:
                return state
        }


    }

export default combineReducers({
    categories,
    posts,
    sortOrder,
    comments,
    commentsOrder
})