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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'


const muiTheme = getMuiTheme({
    palette: {
        accent1Color: 'rgb(0, 0, 0)',
        secondary2color: 'rgb(0, 84, 129)'
    }
});

const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  }
}


class App extends Component {

  state={
    modalIsOpen: false,
    newPost: false,
    listPostId: undefined
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
      newPost:false,
      listPostId:undefined
    })
  }

  createNewPost(){
    this.setState({newPost:true})
    this.openModal()
  }


  editPostWithId(id){
    this.setState({
      listPostId:id,
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

    postId = postId !== undefined ? postId : this.state.listPostId


    let categories = this.props.categories.sort(sortBy('name'))

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='chatter-app'>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="New posts holder">

          <AddEditPost postId={postId} closeModal={()=>this.closeModal()}/>

        </Modal>


        <h1>Let us chat about,..</h1>

        <nav>

          <div className='nav-item'>
            <span>Categories</span>
            <CategoriesNav categories={categories} />
          </div>

          <SortOrder title="Sort posts by" type="posts" />

          <div className='nav-item'>
            <RaisedButton label="Add new post" onClick={()=>this.createNewPost()} />
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
            <Posts
              openEdit={(id)=>this.editPostWithId(id)}
             />

        }

        </div>

      </div>
      </MuiThemeProvider>
    )
  }
}


export default connect(mapStateToProps,{setCategory,getCommentsById})(App);

