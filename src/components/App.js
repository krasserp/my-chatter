import React, {Component} from 'react';
import CategoriesNav from './CategoriesNav'
import Posts from './Posts'
import SortOrder from './SortOrder'
import sortBy from 'sort-by'
import {setCategory} from '../actions/categories'
import {getCommentsById} from '../actions/comments'
import {connect} from 'react-redux'
import PostDetail from './PostDetail'
import AddEditPost from './AddEditPost'
import Modal from 'react-modal'


const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  }
}


class App extends Component {

  state={
    modalIsOpen: false,
    newPost: false
  }

  onSelect(data){
    this.props.setCategory(data)
  }

  openModal() {
      this.setState({modalIsOpen: true});
    }


  closeModal() {
    this.setState({
      modalIsOpen: false,
      newPost:false
    });
  }

  createNewPost(){
    this.setState({newPost:true})
    this.openModal()
  }

  editPostWithId(id){
    this.setState({
      modalIsOpen:true
    })
  }


  checkUrlParams = (props) => {

    let urlCat = props.match.params.cat || 'all'

    this.props.categories.map((cat)=>{
      if(urlCat === cat.path && !cat.active){
        this.props.setCategory(urlCat)
      }
      return true
    })

  }


  componentWillMount(){
    this.checkUrlParams(this.props)
  }

  componentWillReceiveProps(nextProps){
    this.checkUrlParams(nextProps)
  }


  render() {

    let {postId,cat} = this.props.match.params

    this.props.posts.forEach((el)=> {
      this.props.getCommentsById(el.id)
    })

    let currentPost = postId && cat !== 'all' ? this.props.posts.filter((item)=>item.id === postId)[0] : null

    let categories = this.props.categories.sort(sortBy('name'))

    return (

      <div className='chatter-app'>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="New posts holder">

          <AddEditPost postId={currentPost != null && !this.state.newPost ? currentPost.id : undefined} closeModal={()=>this.closeModal()}/>

        </Modal>


        <h1>Let us chat about,..</h1>

        <nav>

          <div className='nav-item'>
            <span>Categories</span>
            <CategoriesNav categories={categories} />
          </div>

          <SortOrder title="Sort posts by" type="posts" />

          <div className='nav-item'>
            <button className='new-post-btn button' onClick={()=>this.createNewPost()}>Add new post</button>
          </div>

        </nav>


        <div className='post-list'>

        {currentPost != null ?

          <PostDetail key={currentPost.id}
                      id={currentPost.id}
                      title={currentPost.title}
                      voteScore={currentPost.voteScore}
                      timestamp={currentPost.timestamp}
                      author={currentPost.author}
                      body={currentPost.body}
                      category={currentPost.category}
                      deleted={currentPost.deleted}
                      openEdit={()=>this.editPostWithId(currentPost.id)}/>
          :
            <Posts />

        }

        </div>

      </div>

    )
  }
}


export default connect(mapStateToProps,{setCategory,getCommentsById})(App);

