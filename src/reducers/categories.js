import {
    SET_CATEGORY,
    UPDATE_CATEGORY,
} from '../actions/types'


const initialCategoriesState = [

        {name: 'react',  path: 'react',    active: false},
        {name: 'redux',  path: 'redux',    active: false},
        {name: 'udacity',path: 'udacity',  active: false},
        {name: 'all',    path: 'all',      active: true},

    ]

export const categories = (state=initialCategoriesState, action) => {
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
