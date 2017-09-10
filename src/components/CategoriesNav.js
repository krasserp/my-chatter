import React from 'react'
import {capitalize} from '../utils/helpers'

export default function CategoriesNav ({categories,onSelect}){

    return(

            <ul className='categories'>
              {categories.map((item) => (

                <li key={item.name} className={item.active ? 'active' : ''} onClick={()=>onSelect(item.name)}> {capitalize(item.name)}</li>

              ))}
            </ul>


        )

}