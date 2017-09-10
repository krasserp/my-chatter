import React, {Component} from 'react'
import {capitalize,formatTimeStamp} from '../utils/helpers'
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted,TiThumbsDown,TiThumbsUp,TiEdit,TiMessages} from 'react-icons/lib/ti'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import {putCommentVote} from '../actions'
import SortOrder from './SortOrder'



const mapDispatchToProps = (dispatch) =>({

  setVote: (id, vote) => dispatch(putCommentVote(id,vote))

})


// redux mapping
const mapStateToProps = ({comments,commentsOrder}) => {

  return {
    commentsOrder,
    comments
  }
}



class Comments extends Component{



  render(){

    const upDownVote = this.props.setVote

    const sortOrder = this.props.commentsOrder
    const comments = this.props.comments


    const commentsMapped =[]

    for(let c in comments){
      commentsMapped.push(comments[c])
    }


    let displayComments = commentsMapped.filter(item => item.parentId === this.props.postId)

    // how to sort
    let currentSortOrder = sortOrder.filter(item=>item.active)[0]
    let sortOrderStr = currentSortOrder['order']+currentSortOrder['map']



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
                <a className='post-score-vote-down button' onClick={()=>upDownVote(item.id,{option:'downVote'})}alt="Edit" title="edit"><TiThumbsDown size={20}/></a>
                <span className='post-edit button'><TiEdit size={20}/></span>
              </div>

            </div>
            ))}
      </div>

      )


  }


}


export default connect(mapStateToProps,mapDispatchToProps)(Comments);