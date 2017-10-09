import React, {Component} from 'react'
import {formatTimeStamp} from '../utils/helpers'
import {TiThumbsDown,TiThumbsUp,TiMessages,TiDelete,TiEdit} from 'react-icons/lib/ti'
import {putPostVote,deletePostId} from '../actions/posts'
import {connect} from 'react-redux'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';

const mapStateToProps = ({comments}) => {

  return {
    comments
  }
}



class Post extends Component{

    state ={
        showComments : false,
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



    editCommentWithId(postId){

      return (id) => {
          this.setState({
            editCommentId:id,
            parentId:postId
          })

      }

    }


  render(){

        const {id,title,voteScore,timestamp,author,comments,body,category} = this.props
        const upDownVote = this.props.putPostVote
        const deletePost = this.props.deletePostId
        const editPost = this.props.openEdit
        let commentsCount = {}

        for (let c in comments){
          // only count a comment if it wasn't deleted
          let checkId = !comments[c].deleted ? comments[c].parentId : 0
          commentsCount[checkId] = commentsCount[checkId] ? commentsCount[checkId] + 1: 1
        }

    return(

            <div className='post' key={id} id={'id_'+id}>

              <div className='post-top-info'>
                <span className='post-title post-link'>
                  <Link to={'/'+category+'/'+id}>
                    <FlatButton style={{textDecoration:'underline'}} label={title} />
                  </Link>
                </span>
                <span className='post-score'>{voteScore > 0 ? '+'+voteScore : +voteScore} </span>
                <span className='post-date'>{formatTimeStamp(timestamp)}</span>
                <FlatButton style={{textDecoration:'underline'}} onClick={()=>this.showHide()}>{commentsCount[id] ? commentsCount[id]: 0 } <TiMessages size={15}/></FlatButton>
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
                <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>upDownVote(id,{option:'upVote'})}><TiThumbsUp size={20}/></RaisedButton>
                <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>upDownVote(id,{option:'downVote'})}alt="Edit" title="edit"><TiThumbsDown size={20}/></RaisedButton>
                <RaisedButton className="small-btn" style={{minWidth: '30px'}} onClick={()=>editPost(id)}><TiEdit size={20}/></RaisedButton>
              </div>
              {commentsCount[id] > 0 && this.state.showComments &&  <Comments enableEdit={false} postId={id} openEdit={this.editCommentWithId(id)} />}
              <RaisedButton className="post-delete" style={{minWidth: '30px'}} onClick={()=>deletePost(id)}><TiDelete size={20}/></RaisedButton>
            </div>
            )
    }

}



export default connect(mapStateToProps,{putPostVote,deletePostId})(Post);