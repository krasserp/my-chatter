import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiDelete} from 'react-icons/lib/ti'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import {putCommentVote,deleteCommentId} from '../actions/comments'
import SortOrder from './SortOrder'



const mapStateToProps = ({comments,commentsOrder}) => {

  return {
    commentsOrder,
    comments
  }
}



class Comments extends Component{



  render(){

    const upDownVote = this.props.putCommentVote
    const sortOrder = this.props.commentsOrder
    const comments = this.props.comments
    const deleteComment = this.props.deleteCommentId
    const commentsMapped =[]

    for(let c in comments){
      commentsMapped.push(comments[c])
    }


    let displayComments = commentsMapped.filter(item => item.parentId === this.props.postId && !item.deleted)

    // how to sort
    let currentSortOrder = sortOrder.filter(item=>item.active)[0]
    let sortOrderStr = currentSortOrder['order']+currentSortOrder['map']
    let editPostWithId = this.props.openEdit

    displayComments.sort(sortBy(sortOrderStr))


    return(

      <div className='comments'>
      <SortOrder title="Sort comments by" type="comments" />
          {displayComments.map((item) => (
            <div className='post comments' key={item.id}>

              <div className='post-top-info'>
                <span className='post-score'>{item.voteScore > 0 ? '+'+item.voteScore : +item.voteScore} </span>
                <span className='post-date'>{formatTimeStamp(item.timestamp)}</span>
                <span className='post-author'>{item.author}</span>
              </div>

              <div className='post-details'>
                {item.body}
              </div>

              <div className='post-button-info'>
                <span className='post-score-vote-up button' onClick={()=>upDownVote(item.id,{option:'upVote'})}><TiThumbsUp size={20}/></span>
                <span className='post-score-vote-down button' onClick={()=>upDownVote(item.id,{option:'downVote'})} alt="Edit" title="edit"><TiThumbsDown size={20}/></span>
                <span className='post-edit button' onClick={()=>editPostWithId(item.id)}><TiEdit size={20}/></span>
              </div>
              <span className='comment-delete button' onClick={()=>deleteComment(item.id)}><TiDelete size={17}/></span>
            </div>
            ))}
      </div>

      )


  }


}


export default connect(mapStateToProps,{putCommentVote,deleteCommentId})(Comments);