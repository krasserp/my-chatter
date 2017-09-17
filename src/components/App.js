import React, { Component } from 'react';
import CategoriesNav from './CategoriesNav'
import Posts from './Posts'
import SortOrder from './SortOrder'
import sortBy from 'sort-by'
import {setCategory, getCommentsById} from '../actions'
import {connect} from 'react-redux'




import AddEditPost from './AddEditPost'
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
  fetchCats : (data) => dispatch(setCategory(data)),
  fetchComments: (id ) => dispatch(getCommentsById(id)),

})


// redux mapping
const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  }
}




class App extends Component {



  state={
    modalIsOpen: false
  }

  onSelect(data){
    this.props.fetchCats(data)
  }

  openModal() {
      this.setState({modalIsOpen: true});
    }


  closeModal() {
    this.setState({modalIsOpen: false});
  }


  checkUrlParams = (props) => {

    let urlCat = props.match.params.cat || 'all'

    this.props.categories.map((cat)=>{
      if(urlCat === cat.path && !cat.active){
        this.props.fetchCats(urlCat)
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


    this.props.posts.forEach((el)=> {
      this.props.fetchComments(el.id)
    })



    let categories = this.props.categories.sort(sortBy('name'))

    return (


      <div className='chatter-app'>

      <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          style={customStyles}
          contentLabel="New posts holder"
        >

          <AddEditPost closeModal={()=>this.closeModal()}/>

        </Modal>


        <h1>Let us chat about,..</h1>

        <nav>

        <div className='nav-item'>
          <span>Categories</span>
          <CategoriesNav categories={categories} />
        </div>

          <SortOrder title="Sort posts by" type="posts" />

          <div className='nav-item'>
            <button className='new-post-btn button' onClick={()=>this.openModal()}>Add new post</button>
          </div>

        </nav>



        <div className='post-list'>

          <Posts goto={this.props.match.params.postId} />

        </div>


      </div>





    )
  }
}







export default connect(mapStateToProps,mapDispatchToProps)(App);

