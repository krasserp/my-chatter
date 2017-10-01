import React, {Component} from 'react'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import Post from './Post'


const mapStateToProps = ({categories,posts,sortOrder}) => {

  return {
    categories,
    posts,
    sortOrder,
  }

}



class Posts extends Component{


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


          {displayPosts.map((item) => (
              <Post key={item.id}
                    id={item.id}
                    title={item.title}
                    voteScore={item.voteScore}
                    timestamp={item.timestamp}
                    author={item.author}
                    body={item.body}
                    category={item.category}
                    openEdit={()=>this.editPostWithId(item.id)}/>
            ))}


      </div>

      )


  }


}


export default connect(mapStateToProps)(Posts);