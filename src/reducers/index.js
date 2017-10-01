import {combineReducers} from 'redux'
import {sortOrder} from './sortOrder'
import {comments,commentsOrder} from './comments'
import {posts} from './posts'
import {categories} from './categories'

export default combineReducers({
    categories,
    posts,
    sortOrder,
    comments,
    commentsOrder
})