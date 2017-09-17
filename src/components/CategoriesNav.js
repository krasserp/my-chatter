import React from 'react'
import {capitalize} from '../utils/helpers'
import {Link} from 'react-router-dom'

export default function CategoriesNav ({categories}){

    return(

            <ul className='categories'>
              {categories.map((item) => (
                <Link to={'/'+item.name}  key={item.name}>
                    <li key={item.name} className={item.active ? 'active' : ''} >{capitalize(item.name)}</li>
                </Link>

              ))}
            </ul>


        )

}