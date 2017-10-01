import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiMessages,TiDelete} from 'react-icons/lib/ti'
import {FaShareAlt} from 'react-icons/lib/fa'
import {putPostVote,deletePostId} from '../actions/posts'
import {connect} from 'react-redux'
import Comments from './Comments'
import AddEditComment from './AddEditComment'
import Modal from 'react-modal'


const mapStateToProps = ({comments}) => {

  return {
    comments
  }
}


class PostDetail extends Component{

    state ={
        showComments : true,
        modalIsOpen: false,
        editCommentId: null,
        parentId: null,
        shareLink: false
    }


    showHide = () => {

        let newVisibility = this.state.showComments ? false : true
        this.setState( (state) => ({
          showComments: newVisibility
        })

        );
    }


    openModal(postId,shareLink=false) {

      if(!shareLink){
        this.setState({
          shareLink: false,
          modalIsOpen: true,
          parentId: postId
        })
      } else if(shareLink){

        let currentRouteName =  window.location.origin
         this.setState({
          modalIsOpen: true,
          shareLink: currentRouteName+'/'+shareLink
        })

      }
    }

    closeModal() {
      this.setState({modalIsOpen: false, editCommentId: null});
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
        const {id, title, voteScore, timestamp,author,comments,body,category,deleted} = this.props
        const upDownVote = this.props.putPostVote
        const deletePost = this.props.deletePostId
        const editPost = this.props.openEdit

        let commentsCount = {}

        for (let c in comments){
          let checkId = !comments[c].deleted ? comments[c].parentId : 0
          commentsCount[checkId] = commentsCount[checkId] ? commentsCount[checkId] + 1: 1
        }

    return(

              <div className='post' key={id} >

              {deleted &&

                <div className='warning'>
                  Sorry the post with id {id} has been deleted.
                </div>

              }

              {!deleted &&
              <div>


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
                        <div className="share-link">
                        Copy the link below to share this post:<br/>
                        {this.state.shareLink}
                        </div>

                    }

                  </Modal>



                <div className='post-top-info'>
                  <span className='post-title'>{title}</span>
                  <span className='post-score'>{voteScore > 0 ? '+'+voteScore : +voteScore} </span>
                  <span className='post-date'>{formatTimeStamp(timestamp)}</span>
                  <span className="post-comments button" onClick={()=>this.showHide()}>{commentsCount[id] ? commentsCount[id]: 0 } <TiMessages size={15}/></span>
                  <span className='post-author'>{author}</span>
                  <span className='post-share button' onClick={()=>this.openModal(id, category+'/'+id)}> <FaShareAlt size={20} /></span>
                </div>

                <div className='post-details'>
                  {body}
                </div>

                <div className='post-button-info'>
                  <span className='post-score-vote-up button' onClick={()=>upDownVote(id,{option:'upVote'})}><TiThumbsUp size={20}/></span>
                  <span className='post-score-vote-down button' onClick={()=>upDownVote(id,{option:'downVote'})}alt="Edit" title="edit"><TiThumbsDown size={20}/></span>
                  <span className='post-edit button'onClick={()=>editPost()}><TiEdit size={20}/></span>
                  <span className='post-comment button' onClick={()=>this.openModal(id)}>Comment</span>
                </div>
                {commentsCount[id] > 0 && this.state.showComments &&  <Comments postId={id} openEdit={this.editCommentWithId(id)} />}
                <span className='post-delete button' onClick={()=>deletePost(id)}><TiDelete size={20}/></span>

                </div>
              }
              </div>
        )
    }

}



export default connect(mapStateToProps,{putPostVote,deletePostId})(PostDetail);