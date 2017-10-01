import * as chatApi from '../api'
import {
        SET_CATEGORY,
        UPDATE_CATEGORY
      } from './types'

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

                  fetchedInitalState.push({name:'all', path:'all',active:true})
                  dispatch(updateCategory(fetchedInitalState))
                }

            )


    )