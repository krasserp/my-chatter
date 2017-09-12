import React, {Component} from 'react'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import Post from './Post'



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



// redux mapping
const mapStateToProps = ({categories,posts,sortOrder}) => {
  //console.log('logging cats ', categories)

  return {
    categories,
    posts,
    sortOrder,

  }
}



class Posts extends Component{

  state={
      modalIsOpen: false,
      editPostId : null
    }


  openModal() {
      this.setState({modalIsOpen: true});
    }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  editPostWithId(id){
    this.setState({
      editPostId:id,
      modalIsOpen:true
    })


  }




  render(){


    const {categories,posts,sortOrder} = this.props


    let showCat = categories.filter( item => item.active )[0].name


    let displayPosts = showCat ==='all' ? posts.filter(item => !item.deleted ) : posts.filter(item => (item.category === showCat && !item.deleted))

    // how to sort
    let currentSortOrder = sortOrder.filter(item=>item.active)[0]
    let sortOrderStr = currentSortOrder['order']+currentSortOrder['map']

    displayPosts.sort(sortBy(sortOrderStr))


    return(

      <div>


      <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={()=>this.closeModal()}
          style={customStyles}
          contentLabel="New posts holder"
        >

          <AddEditPost postId={this.state.editPostId} closeModal={()=>this.closeModal()}/>

        </Modal>




          {displayPosts.map((item) => (
              <Post key={item.id}
                    id={item.id}
                    title={item.title}
                    voteScore={item.voteScore}
                    timestamp={item.timestamp}
                    author={item.author}
                    body={item.body}
                    openEdit={()=>this.editPostWithId(item.id)}/>
            ))}
      </div>

      )


  }


}


export default connect(mapStateToProps)(Posts);