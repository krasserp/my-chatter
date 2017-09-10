import React,{Component} from 'react'
import {connect} from 'react-redux'
import {setCategory,fetchCategory,postPost,updatePost} from '../actions'
import sortBy from 'sort-by'
import {capitalize} from '../utils/helpers'
import uuidv1 from 'uuid/v1'

// write actions to update a post
//
//

const mapDispatchToProps = (dispatch) =>({
  fetchCats : (data) => dispatch(setCategory(data)),
  setServerCats: (data) => dispatch(fetchCategory(data)),
  putPost: (data) => dispatch(postPost(data)),
  updatePost: (id,data) => dispatch(updatePost(id,data))
})


// redux mapping
const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  }
}



class AddEditPost extends Component{

    onSubmission = (event) => {
        event.preventDefault()
        //const uuid = uuidv1
        //
        if(this.props.postId === undefined){

            let postBody = {
                id : uuidv1(),
                timestamp: Date.now(),
                title: this.title.value,
                body: this.body.value,
                author: this.author.value,
                category: this.category.value
            }

            console.log(postBody)

            this.props.putPost(postBody)
                .then(()=>{
                    this.title.value = ''
                    this.body.value =''
                    this.author.value = ''
                    this.props.closeModal()

                })

        } else {

            let postId = this.props.postId
            let postData = {
                title: this.title.value,
                body: this.body.value
            }

            this.props.updatePost(postId,postData)
                .then(()=>{
                    this.title.value = ''
                    this.body.value =''
                    this.author.value = ''
                    this.props.closeModal()
                })

        }

    }


    onSelect(){
        this.props.fetchCats(this.category.value)
    }

    render(){

        let {categories,posts,postId}  = this.props
        let thisPost,selValue

        categories = categories.sort(sortBy('name'))

        if(postId !== undefined){
            thisPost = posts.filter((item)=> item.id === postId)[0]

        }



        selValue = postId !== undefined ? thisPost.category : categories.filter((item)=>item.active)[0].name
        console.log('POST id is ', postId)

        return(


            <div className='add-edit-post'>

                <form action="" onSubmit={(ev)=>this.onSubmission(ev)}>

                <div className='categories'>
                    Set a category:<br/>
                    <select name="category"
                        value={selValue}
                        ref={select => this.category = select}
                        onChange={()=>this.onSelect()}
                        disabled={postId!==undefined}
                        >

                        {categories.map((item,i)=>(

                            <option key={i} value={item.name} disabled={item.name==='all'}  >{capitalize(item.name)}</option>

                        ))}


                    </select>

                </div>


                <label >
                    Title:
                    <input
                    ref={input => this.title = input}
                    type="text" name='title' defaultValue={postId!==undefined ? thisPost.title : ''} />
                </label>


                <label >
                    Author:
                    <input
                    ref={input => this.author = input}
                    type="text" name='author' defaultValue={postId!==undefined ? thisPost.author : ''}  disabled={postId!==undefined} />
                </label>


                <label>
                    Post body:
                    <textarea
                    ref={input => this.body = input}
                    type="text" name='body' defaultValue={postId!==undefined ? thisPost.body : ''} />
                </label>


                <input className="button" type="submit"  value={postId!==undefined ? 'edit post' : 'add post'} disabled={selValue==='all'}/>

                </form>



            </div>



        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddEditPost);