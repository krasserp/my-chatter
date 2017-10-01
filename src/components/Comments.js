import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiDelete} from 'react-icons/lib/ti'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import {putCommentVote,deleteCommentId} from '../actions/comments'
import SortOrder from './SortOrder'
import RaisedButton from 'material-ui/RaisedButton'



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
      {displayComments.length > 1 && <SortOrder title="Sort comments by" type="comments" />}
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
                <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>upDownVote(item.id,{option:'upVote'})}><TiThumbsUp size={20}/></RaisedButton>
                <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>upDownVote(item.id,{option:'downVote'})} alt="Edit" title="edit"><TiThumbsDown size={20}/></RaisedButton>
                {this.props.enableEdit && <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>editPostWithId(item.id)}><TiEdit size={20}/></RaisedButton> }
              </div>
              {this.props.enableEdit && <RaisedButton className='comment-delete' style={{minWidth: '25px'}} onClick={()=>deleteComment(item.id)}><TiDelete size={17}/></RaisedButton>}
            </div>
            ))}
      </div>

      )


  }


}


export default connect(mapStateToProps,{putCommentVote,deleteCommentId})(Comments);