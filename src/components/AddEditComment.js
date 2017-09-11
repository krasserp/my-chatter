import React,{Component} from 'react'
import {connect} from 'react-redux'
import {postComment,updateComment} from '../actions'
import {capitalize} from '../utils/helpers'
import uuidv1 from 'uuid/v1'



const mapDispatchToProps = (dispatch) =>({
  putComment: (data) => dispatch(postComment(data)),
  updateComment: (id,data) => dispatch(updateComment(id,data))
})



const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}



class AddEditComment extends Component{

    onSubmission = (event) => {
        event.preventDefault()

        // if props commentId exists it will be a update to an existing comment
        // else a new comment is being created
        if(this.props.commentId === null){

            let postBody = {
                id : uuidv1(),
                timestamp: Date.now(),
                body: this.body.value,
                author: this.author.value,
                parentId: this.props.parentId
            }

            this.props.putComment(postBody)
                .then(()=>{
                    this.body.value =''
                    this.author.value = ''
                    this.props.closeModal()

                })

        } else {

            let commentId = this.props.commentId
            let postData = {
                timestamp: Date.now(),
                body: this.body.value
            }

            this.props.updateComment(commentId,postData)
                .then(()=>{
                    this.body.value =''
                    this.author.value = ''
                    this.props.closeModal()
                })

        }

    }




    render(){

        let {comments,parentId,commentId}  = this.props
        let thisComment


        if(commentId !== null){
            thisComment = comments[commentId]

        }

        return(


            <div className='add-edit-comment'>

                <form action="" onSubmit={(ev)=>this.onSubmission(ev)}>


                <label >
                    Author:
                    <input
                    ref={input => this.author = input}
                    type="text" name='author' defaultValue={commentId!==null ? thisComment.author : ''}  disabled={commentId!==null} />
                </label>


                <label>
                    Comment body:
                    <textarea
                    ref={input => this.body = input}
                    type="text" name='body' defaultValue={commentId!==null ? thisComment.body : ''} />
                </label>


                <input className="button" type="submit"  value={commentId!==null ? 'edit comment' : 'add comment'} />

                </form>



            </div>



        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddEditComment);
