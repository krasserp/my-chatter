import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiEdit,TiMessages} from 'react-icons/lib/ti'
import {putPostVote} from '../actions'
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
        showComments : true,
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
      });
    }

    closeModal() {
      this.setState({modalIsOpen: false});
    }




    editCommentWithId(postId){

      return (id) => {
          console.log('commentIdPassed is ', id, 'for Post Id', postId)
          this.setState({
            editCommentId:id,
            parentId:postId,
            modalIsOpen:true
          })

      }


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

            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={()=>this.closeModal()}
                style={customStyles}
                contentLabel="New/Edit comment modal"
              >

                <AddEditComment
                  commentId={this.state.editCommentId}
                  parentId={this.state.parentId}
                  closeModal={()=>this.closeModal()}
                   />

              </Modal>



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
                <span className='post-comment button' onClick={()=>this.openModal(id)}>Comment</span>
              </div>
              {commentsCount[id] > 0 && this.state.showComments &&  <Comments postId={id} openEdit={this.editCommentWithId(id)} />}
            </div>
            )
    }

}



export default connect(mapStateToProps,mapDispatchToProps)(Post);