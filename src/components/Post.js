import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiMessages} from 'react-icons/lib/ti'
import {putPostVote} from '../actions'
import {connect} from 'react-redux'
import Comments from './Comments'






const mapDispatchToProps = (dispatch) =>({

  setVote: (id, vote) => dispatch(putPostVote(id,vote))

})


// redux mapping
const mapStateToProps = ({comments}) => {



  return {
    comments
  }
}


class Post extends Component{

    state ={
        showComments : true
    }


    showHide = () => {

        let newVisibility = this.state.showComments ? false : true
        console.log(newVisibility, ' vs ', this.state.showComments)
        this.setState( (state) => ({
          showComments: newVisibility
        })

        );
    }

  render(){
        const {id, title, voteScore, timestamp,author,comments,body} = this.props
        const upDownVote = this.props.setVote

        const editPost = this.props.openEdit

        let commentsCount = {}

        for (let c in comments){
          let checkId = comments[c].parentId
          commentsCount[checkId] = commentsCount[checkId] ? commentsCount[checkId] + 1: 1
        }

    return(

            <div className='post' key={id}>

              <div className='post-top-info'>
                <span className='post-title'>{title}</span>
                <span className='post-score'>{voteScore > 0 ? '+'+voteScore : +voteScore} </span>
                <span className='post-date'>{formatTimeStamp(timestamp)}</span>
                <span className="post-comments button" onClick={()=>this.showHide()}>{commentsCount[id] ? commentsCount[id]: 0 } <TiMessages size={15}/></span>
                <span className='post-author'>{author}</span>
              </div>

              <div className='post-details'>
                {body}
              </div>

              <div className='post-button-info'>
                <span className='post-score-vote-up button' onClick={()=>upDownVote(id,{option:'upVote'})}><TiThumbsUp size={20}/></span>
                <a className='post-score-vote-down button' onClick={()=>upDownVote(id,{option:'downVote'})}alt="Edit" title="edit"><TiThumbsDown size={20}/></a>
                <span className='post-edit button'onClick={()=>editPost()}><TiEdit size={20}/></span>
                <span className='post-comment button'>Comment</span>
              </div>
              {commentsCount[id] > 0 && this.state.showComments &&  <Comments postId={id} />}
            </div>
            )
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(Post);