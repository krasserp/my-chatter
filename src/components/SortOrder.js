import React,{Component} from 'react'
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted} from 'react-icons/lib/ti'
import {connect} from 'react-redux'
import {sortItemsBy,sortCommentsBy} from '../actions/comments'
import RaisedButton from 'material-ui/RaisedButton';


const mapStateToProps = ({sortOrder,commentsOrder}) => {
    return{
        sortOrder,
        commentsOrder
    }
}

class SortOrder extends Component{


    changeOrder(data){

        let newOrder

        if(this.props.type==='posts'){
            newOrder = this.props.sortOrder.map(item=>{
                item.active = item.map === data
                if(item.map === data){
                    item.order = item.order === '' ? '-' : ''
                }

                return item
            })

            this.props.sortItemsBy(newOrder)
        }

        if(this.props.type==='comments'){
            newOrder = this.props.commentsOrder.map(item=>{
                item.active = item.map === data
                if(item.map === data){
                    item.order = item.order === '' ? '-' : ''
                }


                return item
            })

            this.props.sortCommentsBy(newOrder)
        }

    }

    render(){

        const timeUp = this.props.type==='posts' ? this.props.sortOrder.filter(item=>item.map==='timestamp')[0] :  this.props.commentsOrder.filter(item=>item.map==='timestamp')[0]
        const scoreUp = this.props.type==='posts' ? this.props.sortOrder.filter(item=>item.map==='voteScore')[0] : this.props.commentsOrder.filter(item=>item.map==='voteScore')[0]

        return(

            <div className='nav-item'>
                <span>{this.props.title}</span>

                <div>
                  <RaisedButton onClick={()=>this.changeOrder('timestamp')}> {(timeUp.active && timeUp.order==='' && <TiArrowSortedUp size={15}  />) || (timeUp.active && timeUp.order==='-' && <TiArrowSortedDown size={15}  />) || <TiArrowUnsorted size={15}  />} Date</RaisedButton>
                  <RaisedButton onClick={()=>this.changeOrder('voteScore')} >{(scoreUp.active && scoreUp.order==='' && <TiArrowSortedUp size={15}  />) || (scoreUp.active && scoreUp.order==='-' && <TiArrowSortedDown size={15}  />) || <TiArrowUnsorted size={15}  />} Score</RaisedButton>
                </div>
            </div>

            )

    }


}

export default connect(mapStateToProps,{sortItemsBy,sortCommentsBy})(SortOrder)