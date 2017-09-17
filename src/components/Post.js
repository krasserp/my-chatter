import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiMessages,TiDelete} from 'react-icons/lib/ti'
import {FaShareAlt} from 'react-icons/lib/fa'
import {putPostVote,deletePostId} from '../actions'
import {connect} from 'react-redux'
import Comments from './Comments'
import AddEditComment from './AddEditComment'
import Modal from 'react-modal'





const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '450px',
    maxWidth              :'100%',
    transform             : 'translate(-50%, -50%)'
  }
};





const mapDispatchToProps = (dispatch) =>({

  setVote: (id, vote) => dispatch(putPostVote(id,vote)),
  deletePost: (id) => dispatch(deletePostId(id))

})



const mapStateToProps = ({comments}) => {

  return {
    comments
  }
}


class Post extends Component{

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
       // console.log(currentRouteName, 'current route name?')

        this.setState({
          modalIsOpen: true,
          shareLink: currentRouteName+'/'+shareLink
        })

      }
    }

    closeModal() {
      this.setState({modalIsOpen: false});
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


  componentDidMount(){


    const scrollToElement = require('scroll-to-element');
    if(this.props.goto !== false){
      let postId = document.querySelector('#id_'+this.props.goto)
      setTimeout(()=>{
          scrollToElement(postId)
          postId.className += ' item-highlight'
          setTimeout(()=>{
            postId.className = postId.className.split(' ').filter((item)=> (item !== 'item-highlight'))
          },2000)
        },500)
    }

  }



  render(){
        const {id, title, voteScore, timestamp,author,comments,body,category} = this.props
        const upDownVote = this.props.setVote
        const deletePost = this.props.deletePost
        const editPost = this.props.openEdit

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
                style={customStyles}
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
            )
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(Post);