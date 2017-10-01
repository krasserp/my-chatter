import {SORT_COMMENTS_BY,
        SET_COMMENTS,
        SET_COMMENT_VOTE,
        ADD_COMMENT,
        EDIT_COMMENT,
        DELETE_COMMENT} from '../actions/types'


const initCommentsOrder = [

    {map: 'timestamp', active: false, order: ''},
    {map: 'voteScore', active: true, order: '-'}

]


export const commentsOrder = (state=initCommentsOrder, action) => {
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




export const comments = (state=initComments, action) => {
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