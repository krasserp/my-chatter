import {SORT_ITEMS_BY} from '../actions/types'
const initSortOrder = [

    {map: 'timestamp', active: false, order: ''},
    {map: 'voteScore', active: true, order: '-'}

]


export const sortOrder = (state=initSortOrder, action) => {
    const {order} = action
    switch(action.type){
        case SORT_ITEMS_BY:
            return order
        default:
            return state
    }
}
