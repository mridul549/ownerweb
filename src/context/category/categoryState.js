import { useState } from 'react'
import CategoryContext from './categoryContext'

const CategoryState = (props) => {
    // if method 0 then add new category else if method 1 edit the category
    // this is introduced such that if a user first edits the category then its details will be saved in the context
    // and if he goes onto add, a fresh new form won't be provided
    const [categoryDetails, setCategoryDetails] = useState({id: '', name: '', iconUrl: '', iconId: '', method: 0, productArray: []})



    return (
        <CategoryContext.Provider value={{categoryDetails, setCategoryDetails}}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryState