import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiMessages} from 'react-icons/lib/ti'
import {putPostVote} from '../actions/posts'
import {connect} from 'react-redux'
import Comments from './Comments'
import AddEditComment from './AddEditComment'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'


const mapStateToProps = ({comments}) => {

  return {
    comments
  }
}


class Post extends Component{

    state ={
        showComments : false,
        modalIsOpen: false,
        editCommentId: null,
        parentId: null
    }


    showHide = () => {

        let newVisibility = this.state.showComments ? false : true
        this.setState( (state) => ({
          showComments: newVisibility
        })

        );
    }


    openModal(postId) {

      this.setState({
        modalIsOpen: true,
        parentId: postId
      })

    }

    closeModal() {
      this.setState({modalIsOpen: false,editCommentId: null});
    }


    editCommentWithId(postId){

      return (id) => {
          this.setState({
            editCommentId:id,
            parentId:postId,
            modalIsOpen:true
          })

      }

    }


  render(){

        const {id,title,voteScore,timestamp,author,comments,body,category} = this.props
        const upDownVote = this.props.putPostVote
        let commentsCount = {}

        for (let c in comments){
          // only count a comment if it wasn't deleted
          let checkId = !comments[c].deleted ? comments[c].parentId : 0
          commentsCount[checkId] = commentsCount[checkId] ? commentsCount[checkId] + 1: 1
        }

    return(

            <div className='post' key={id} id={'id_'+id}>

            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={()=>this.closeModal()}
                className="Modal"
                overlayClassName="Overlay"
                contentLabel="New/Edit comment modal"
              >

                {!this.state.shareLink ?

                  <AddEditComment
                  commentId={this.state.editCommentId}
                  parentId={this.state.parentId}
                  closeModal={()=>this.closeModal()}
                   />
                :
                  <div>
                  Copy the link below to share this post:<br/>
                  {this.state.shareLink}
                  </div>

                }

            </Modal>



              <div className='post-top-info'>
                <span className='post-title post-link'>
                  <Link to={'/'+category+'/'+id}>
                    {title}
                  </Link>
                </span>
                <span className='post-score'>{voteScore > 0 ? '+'+voteScore : +voteScore} </span>
                <span className='post-date'>{formatTimeStamp(timestamp)}</span>
                <span className="post-comments button" onClick={()=>this.showHide()}>{commentsCount[id] ? commentsCount[id]: 0 } <TiMessages size={15}/></span>
                <span className='post-author'>{author}</span>
              </div>

              <div className='post-details'>
                {body.length < 25 ? body
                  :
                  <span>{body.substring(0, 24)+'... '}
                   <Link to={'/'+category+'/'+id}>
                     <span className="post-link">read more</span>
                    </Link>
                  </span>
                }

              </div>

              <div className='post-button-info'>
                <span className='post-score-vote-up button' onClick={()=>upDownVote(id,{option:'upVote'})}><TiThumbsUp size={20}/></span>
                <span className='post-score-vote-down button' onClick={()=>upDownVote(id,{option:'downVote'})}alt="Edit" title="edit"><TiThumbsDown size={20}/></span>
                <span className='post-comment button' onClick={()=>this.openModal(id)}>Comment</span>
              </div>
              {commentsCount[id] > 0 && this.state.showComments &&  <Comments postId={id} openEdit={this.editCommentWithId(id)} />}
            </div>
            )
    }

}



export default connect(mapStateToProps,{putPostVote})(Post);