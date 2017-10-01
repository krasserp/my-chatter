import React from 'react'
import {capitalize} from '../utils/helpers'
import {Link} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';

export default function CategoriesNav ({categories}){

    return(
            <div>

              {categories.map((item) => (
                <Link to={'/'+item.name}  key={item.name}>
                    <RaisedButton key={item.name} backgroundColor={item.active ? 'yellow' : ''} className={'action-button'} label={capitalize(item.name)}/>
                </Link>

              ))}
            </div>
        )

}