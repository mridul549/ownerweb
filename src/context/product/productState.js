import { useState } from 'react'
import ProductContext from './productContext'

const ProductState = (props) => {
    const [productDetails, setProductDetails] = useState({id: '', productName: '', productDescription: '', productPrice: 0, vegRadio: true, productImage: null, method: 0, variants: []})

    return (
        <ProductContext.Provider value={{productDetails, setProductDetails}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState