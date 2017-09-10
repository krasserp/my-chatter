import React,{Component} from 'react'
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted,TiThumbsDown,TiThumbsUp,TiEdit,TiMessages} from 'react-icons/lib/ti'
import {connect} from 'react-redux'
import {sortItemsBy,sortCommentsBy} from '../actions'



const mapStateToProps = ({sortOrder,commentsOrder}) => {
    return{
        sortOrder,
        commentsOrder
    }
}

const mapDispatchToProps = (dispatch) =>({
    changeOrder : (order) => dispatch(sortItemsBy(order)),
    changeCommentsOrder : (order) => dispatch(sortCommentsBy(order))
})


class SortOrder extends Component{


    changeOrder(data){
        let newOrder
        //console.log(this.props.sortOrder, 'currently')
        //console.log(data, ' supplied');
        if(this.props.type==='posts'){
            newOrder = this.props.sortOrder.map(item=>{
                item.active = item.map === data
                if(item.map === data){
                    item.order = item.order === '' ? '-' : ''
                }


                return item
            })

            this.props.changeOrder(newOrder)
        }

        if(this.props.type==='comments'){
            newOrder = this.props.commentsOrder.map(item=>{
                item.active = item.map === data
                if(item.map === data){
                    item.order = item.order === '' ? '-' : ''
                }


                return item
            })

            this.props.changeCommentsOrder(newOrder)
        }

    }

    render(){

        const timeUp = this.props.type==='posts' ? this.props.sortOrder.filter(item=>item.map==='timestamp')[0] :  this.props.commentsOrder.filter(item=>item.map==='timestamp')[0]
        const scoreUp = this.props.type==='posts' ? this.props.sortOrder.filter(item=>item.map==='voteScore')[0] : this.props.commentsOrder.filter(item=>item.map==='voteScore')[0]

        return(


            <div className='nav-item'>
            <span>{this.props.title}</span>
            <ul className='order-by'>
              <li onClick={()=>this.changeOrder('timestamp')}> {(timeUp.active && timeUp.order==='' && <TiArrowSortedUp size={15}  />) || (timeUp.active && timeUp.order==='-' && <TiArrowSortedDown size={15}  />) || <TiArrowUnsorted size={15}  />} Date</li>
              <li onClick={()=>this.changeOrder('voteScore')} >{(scoreUp.active && scoreUp.order==='' && <TiArrowSortedUp size={15}  />) || (scoreUp.active && scoreUp.order==='-' && <TiArrowSortedDown size={15}  />) || <TiArrowUnsorted size={15}  />} Score</li>
            </ul>
          </div>



            )



    }



}

export default connect(mapStateToProps,mapDispatchToProps)(SortOrder)