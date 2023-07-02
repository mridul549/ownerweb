import React, { useEffect, useState, useContext, useRef } from "react";
import "../css/editcategory.css";
import Category from "./Category";
import Spinner from "./Spinner";
import MenuItem from "./MenuItem";
import {Modal, Button} from 'react-bootstrap'
import CategoryContext from "../context/category/categoryContext";
import { useLocation } from "react-router-dom";

export default function EditCategory(props) {

    const inputRef = useRef(null)

    // Product Modal
    const [productForm, setProductForm] = useState({productName: '', productDescription: '', productPrice: 0, vegRadio: true, productImage: null})
    const [variantArray, setVariantArray] = useState([])
    const [errorProduct, setErrorProduct] = useState(false)
    const [successLabelProduct, setSuccessLabelProduct] = useState({value: false, message: ''})
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [apiErrorProduct, setApiErrorProduct] = useState({state: false, message: ""})
    const [image, setImage] = useState('')
    const [isProductModalOpen, setIsProductModalOpen] = useState({state: false, title: '', action: "add", productid: ''})

    // Category Icon Modal
    const [categoryIcons, setCategoryIcons] = useState([])
    const [iconSelected, setIconSelected] = useState({value: false, url: '', set: false, _id: ''})
    
    // Updel Model
    const [successLabelUpdel, setSuccessLabelUpdel] = useState({value: false, message: ''})
    const [loadingUpdelProduct, setLoadingUpdelProduct] = useState(false)
    const [apiErrorUpdel, setApiErrorUpdel] = useState({state: false, message: ""})
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({state: false, title: '', productid: '', product: ''});
    
    // Category Component
    const [formData, setFormData] = useState({categoryName: ''})
    const [error, setError] = useState(false)
    const [successLabel, setSuccessLabel] = useState({value: false, message: ''})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState({state: false, message: ""})
    const { categoryDetails, setCategoryDetails } = useContext(CategoryContext)
    const [beforeEditCategory, setBeforeEditCategory] = useState({name: '', iconId: '', })
    
    // Products Component
    const [productArray, setProductArray] = useState([])

    const handleOpenProductModal = () => {
        setImage('')
        setProductForm({productName: '', productDescription: '', productPrice: 0, vegRadio: true, productImage: null})
        setVariantArray([])
        setIsProductModalOpen({state: true, title: "Add Product", action: "add", productid: ''})
    }

    const handleCloseProductModal = () => {
        setIsProductModalOpen({state: false})
    }

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const deleteProduct = async () => {
        setLoadingUpdelProduct(true)

        const response = await fetch("https://flavr.tech/products/deleteProduct", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify({productid: isConfirmModalOpen.productid, outletid: localStorage.getItem('selectedOutlet')})
        })
        const json = await response.json()
        setLoadingUpdelProduct(false)
        if(json.message==="Product deleled successfully"){
            setSuccessLabelUpdel({value: true, message: json.message})
            setTimeout(() => {
                setSuccessLabelUpdel({value: false, message: ''})
                handleCloseConfirmModal()
            }, 3000)
            fetchProducts()
        } else {
            setApiErrorUpdel({state: true, message: json.error})
        }
        setTimeout(() => {
            handleCloseConfirmModal()
        }, 3000)
    }

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen({title: '', state: false});
    };

    const handleUpDel = async (action, productid, name, desc, price, veg, variants, imageUrl) => {
        const productDetails = {
            id: productid,
            name: name, 
            description: desc,
            price: price, 
            veg: veg,
            variants: variants,
            url: imageUrl
        }
        if(action===0) {
            setIsProductModalOpen({state: true, title: "Update product", action: "update", productid: productid})
            setProductForm({productName: name, productDescription: desc, productPrice: price, vegRadio: veg})
            const variantsToEditArray = []
            for (let i = 0; i < variants.length; i++) {
                const variant = variants[i];
                const array = []
                array["variantName"]=variant.variantName
                array["price"]=`${variant.price}`
                variantsToEditArray.push(array)
            }
            setImage(imageUrl)
            setVariantArray(variantsToEditArray)

        } else if (action===1) {
            setLoadingUpdelProduct(false)
            setSuccessLabelUpdel({value: false, message: ''})
            setApiErrorUpdel({state: false, message: ''})
            setIsConfirmModalOpen({title: "Are you sure you want to delete the product?", state: true, productid: productid, product: productDetails});
        }
    }

    const handleVariantDeletion=(i)=>{
        const deletVal=[...variantArray]
        deletVal.splice(i,1)
        setVariantArray(deletVal)  
    }

    const handleVariantAddition = () => {
        const newArray = [...variantArray, []]
        setVariantArray(newArray)
    }

    const variantOnChange = (e,i) => {
        const { name, value } = e.target;

        setVariantArray((prevVariantArray) => {
            const updatedVariantArray = [...prevVariantArray];
            const variantData = updatedVariantArray[i] || {};
            variantData[name] = value;
            updatedVariantArray[i] = variantData;
            return updatedVariantArray;
        });

        console.log(variantArray);
    }

    const fetchProducts = async () => {
        const response = await fetch(`https://flavr.tech/products/getProductsByCategory?categoryName=${categoryDetails.name}&outletid=${localStorage.getItem('selectedOutlet')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const json = await response.json()
        setProductArray(json.categoryArray[0].products)
    }

    const handleProductForm = async (event) => {
        event.preventDefault();

        if(productForm.productDescription.length===0 || productForm.productName===0 || productForm.productPrice===0){
            setErrorProduct(true)
            return 
        }

        setLoadingProduct(true)
        const ProductFormData = new FormData()
        ProductFormData.append('productName', productForm.productName)
        ProductFormData.append('description', productForm.productDescription)
        ProductFormData.append('price', productForm.productPrice)
        ProductFormData.append('veg', productForm.vegRadio)

        if(productForm.productImage){
            ProductFormData.append('productImage', productForm.productImage)
        } 
        
        if(variantArray.length!==0){
            let variantArrayString = '['
            for (let i = 0; i < variantArray.length; i++) {
                let variant = variantArray[i]
                let json = {"variantName": variant.variantName, "price": parseInt(variant.price)}
                variantArrayString+=JSON.stringify(json)
                variantArrayString+=','
            }
            variantArrayString=variantArrayString.substring(0, variantArrayString.length-1)
            variantArrayString+=']'
            
            ProductFormData.append('variants', variantArrayString)
        }
        
        if(isProductModalOpen.action==='add'){
            ProductFormData.append('outletid', localStorage.getItem('selectedOutlet'))
            ProductFormData.append('categoryid', categoryDetails.id)

            const response = await fetch("https://flavr.tech/products/addProduct", {
                method: "POST", 
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: ProductFormData
            })
            const json = await response.json()
            setLoadingProduct(false)
    
            if(json.message==="Product added successfully") {
                setSuccessLabelProduct({value: true, message: json.message})
                setTimeout(() => {
                    setSuccessLabelProduct({value: false, message: ''})
                    fetchProducts()
                    setIsProductModalOpen({...isProductModalOpen, state: false})
                }, 1000)
            } else {
                if(json.message===undefined || json.message===null){
                    setApiErrorProduct({state: true, message: json.error})
                } else {
                    setApiErrorProduct({state: true, message: json.message})
                }
            }
            console.log("hi from edit req to api");

        } else {
            const response = await fetch(`https://flavr.tech/products/updateProduct/${isProductModalOpen.productid}`, {
                method: "PATCH", 
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: ProductFormData
            })
            const json = await response.json()
            setLoadingProduct(false)
    
            if(json.message==="Product updated successfully") {
                setSuccessLabelProduct({value: true, message: json.message})
                setTimeout(() => {
                    setSuccessLabelProduct({value: false, message: ''})
                    fetchProducts()
                    setIsProductModalOpen({...isProductModalOpen, state: false})
                }, 1000)
            } else {
                if(json.message===undefined || json.message===null){
                    setApiErrorProduct({state: true, message: json.error})
                } else {
                    setApiErrorProduct({state: true, message: json.message})
                }
            }
        }

    }

    const productFormOnChange = (e) => {
        if (e.target.name === "productImageInput") {
            setImage(e.target.files[0])
            setProductForm({ ...productForm, productImage: e.target.files[0] });
        } else {
            setProductForm({ ...productForm, [e.target.name]: e.target.value });
        }
    }

    const handleUpdateCategory = async () => {
        setLoading(true)
        const response = await fetch(`https://flavr.tech/category/updateCategory?categoryid=${categoryDetails.id}&outletid=${localStorage.getItem('selectedOutlet')}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(({name: categoryDetails.name, iconid: categoryDetails.iconId}))
        })
        const json = await response.json()
        setLoading(false)
        if(json.message === "Category updated successfully") {
            setSuccessLabel({value: true, message: json.message})
            setTimeout(() => {
                setSuccessLabel({value: false, message: ''})
            }, 5000)
            setBeforeEditCategory({
                name: categoryDetails.name,
                iconId: categoryDetails.iconId
            })
        } else {
            setApiError({state: true, message: json.message})
        }
    }

    const handleCategoryForm = async (event) => {
        event.preventDefault();
        if(formData.categoryName.length===0 || iconSelected._id.length===0) {
            setError(true)
            return
        }

        setLoading(true)
        const response = await fetch("https://flavr.tech/category/addCategory", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(({categoryName:formData.categoryName, outletid: localStorage.getItem('selectedOutlet'), categoryIconId: iconSelected._id}))
        })
        const json = await response.json()
        setLoading(false)
        if(json.message === "Category created"){
            setCategoryDetails({...categoryDetails, id: json.categoryId})
            setSuccessLabel({value: true, message: json.message})
            setTimeout(() => {
                setSuccessLabel({value: false, message: ''})
            }, 5000)
        } else {
            setApiError({state: true, message: json.message})
        }
    }

    const handleCategoryClick = (url, id) => {
        setIconSelected({
            value: true, 
            url: url, 
            set: true, 
            _id: id
        })
        setCategoryDetails({...categoryDetails, iconUrl: url, iconId: id})
    }

    const onChange = (e) => {
        setApiError(false)
        setFormData({categoryName: e.target.value})
        setCategoryDetails({...categoryDetails, name: e.target.value})
    }

    useEffect(() => {
        if(categoryDetails.method===1){
            setFormData({
                categoryName: categoryDetails.name
            })
            setIconSelected({
                value: true, 
                url: categoryDetails.iconUrl, 
                set: true, 
                _id: categoryDetails.iconId
            })
            setBeforeEditCategory({
                name: categoryDetails.name,
                iconId: categoryDetails.iconId
            })
            setProductArray(categoryDetails.productArray)
        }

        async function fetchData () {
            const response = await fetch("https://flavr.tech/categoryicon/allicons", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const json = await response.json()
            setCategoryIcons(json.result)
        }
        fetchData()
    }, [])

    return (
        <div>
            {/* Product Updel modal */}
            <Modal show={isConfirmModalOpen.state} onHide={handleCloseConfirmModal}>
                <Modal.Header>
                    <Modal.Title style={{textAlign: 'center'}}>{isConfirmModalOpen.title}</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="d-flex justify-content-center">
                    <div>
                        <div className="d-flex justify-content-center" style={{marginTop: "-20px"}}>
                            {loadingUpdelProduct && <Spinner />}
                            {successLabelUpdel.value ? <label htmlFor="" className="successLabel">{successLabelUpdel.message}</label> : ""}
                            {apiErrorUpdel.state ? <label htmlFor="" className="errorLabel">{apiErrorUpdel.message}</label> : ""}
                        </div>
                        <div className="row mt-3 d-flex justify-content-center">
                            <div className="col-lg-6">
                                <Button className="" disabled={loadingUpdelProduct} variant="secondary" onClick={handleCloseConfirmModal}>
                                    No
                                </Button>
                            </div>
                            <div className="col-lg-6">
                                <Button disabled={loadingUpdelProduct} variant="btn" className="yesBtn" onClick={deleteProduct}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Category icon list modal */}
            <div className="modal fade" id="iconListModal" aria-labelledby="iconListModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content shadow-lg popup">
                        <div className="modal-body">
                            <div className="headNClose d-flex justify-content-between">
                                <p></p> {/* Added p tag to use flexbox properly */}
                                <h2 className="modal-title" id="iconListModalLabel">Select Category Icon</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="iconRow row">
                                {categoryIcons.slice(1).map((categoryIcon) => {
                                    return <div className="col-lg-3 iconRow col-md-4 col-sm-4 col-6" key={categoryIcon._id}>
                                        <Category 
                                            set={iconSelected.set && iconSelected._id === categoryIcon._id} 
                                            iconImage={categoryIcon.icon.url} 
                                            onClick={() => handleCategoryClick(categoryIcon.icon.url, categoryIcon._id)}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal show={isProductModalOpen.state} onHide={handleCloseProductModal} className="shadow-xl" style={{borderRadius: "30px"}}>
                <Modal.Body >
                    <div className="headNClose d-flex justify-content-between">
                        <p></p> {/* Added p tag to use flexbox properly */}
                        <h2 className="modal-title" id="iconListModalLabel"> {isProductModalOpen.title} </h2>
                        <button type="button" className="btn-close" onClick={handleCloseProductModal}></button>
                    </div>
                    <div className="form d-flex flex-column justify-content-start align-items-start">
                        <form action="">
                            <label htmlFor="" className="productPic">Product Picture</label>
                            <div className="productImage d-flex flex-column align-items-center justify-content-center" onClick={handleImageClick}>
                                <label htmlFor="productImageInput">{image ? image.name : "Choose an image"} </label>
                                {image ? 
                                    (typeof image === 'string' ? 
                                        <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src={image} alt="" /> : 
                                        <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src={URL.createObjectURL(image)} alt="" />
                                    ) :
                                    <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688220885/no_image_frvfpb.jpg" alt="" />
                                }
                                <input type="file" name="productImageInput" ref={inputRef} onChange={productFormOnChange} className="productPicInput d-flex justify-content-center"/>
                            </div>
                            <div className="productDetails">
                                <label htmlFor="" className="productPic">Product Name</label>
                                <input type="text" id="productName" value={productForm.productName} name="productName" onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product name" />
                                {errorProduct && productForm.productName.length===0 ? <label htmlFor="" className="errorLabel">Product Name can't be empty</label> : ""}  

                                <label htmlFor="" className="productPic">Product Description</label>
                                <input type="text" id="productDescription" name="productDescription" value={productForm.productDescription} onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product description" />
                                {errorProduct && productForm.productDescription.length===0 ? <label htmlFor="" className="errorLabel">Product Description can't be empty</label> : ""}  

                                <label htmlFor="" className="productPic">Product Price</label>
                                <input type="number" id="productPrice" name="productPrice" value={productForm.productPrice} onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product price" />
                                {errorProduct && productForm.productPrice===0 ? <label htmlFor="" className="errorLabel">Product price can't be 0</label> : ""}  

                                <div className="vegRadio d-flex flex-row justify-content-center align-items-center">
                                    {productForm.vegRadio ? 
                                        (<>
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" id="veg" onChange={productFormOnChange} checked name="vegRadio" value={true}/>
                                                <label htmlFor="veg">Veg</label>
                                            </div>
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" onChange={productFormOnChange} id="nonVeg" name="vegRadio" value={false}/>
                                                <label htmlFor="nonVeg">Non-Veg</label>
                                            </div>
                                        </>) :
                                        (<>
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" id="veg" onChange={productFormOnChange}  name="vegRadio" value={true}/>
                                                <label htmlFor="veg">Veg</label>
                                            </div>
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" onChange={productFormOnChange} checked id="nonVeg" name="vegRadio" value={false}/>
                                                <label htmlFor="nonVeg">Non-Veg</label>
                                            </div>
                                        </>) 
                                    }
                                </div>
                            </div>
                            <div className="variants d-flex flex-column justify-content-start align-items-start">
                                <label htmlFor="" className="productPic">Variants <i className="fa-solid fa-circle-plus mx-1 fa-xl" onClick={handleVariantAddition} style={{color: "#004932"}}></i></label>
                                {variantArray.map((data,i) => {
                                    return <div className="variantDetails row" key={i}>
                                        <div className="col-md-5 col-sm-5 col-5">
                                            <input type="text" id="variantName" name="variantName" value={data.variantName || ""} onChange={e=>variantOnChange(e,i)} className="variantInput shadow-sm" placeholder="Enter variant name" />    
                                        </div>
                                        <div className="col-md-5 col-sm-5 col-5">
                                            <input type="number" id="price" name="price" value={data.price || ""} onChange={e=>variantOnChange(e,i)} className="variantInput shadow-sm" placeholder="Enter variant price" />    
                                        </div>
                                        <div className="col-md-2 col-sm-2 col-2 d-flex flex-column justify-content-center align-items-center">
                                            <i className="fa-solid fa-circle-minus fa-xl" onClick={() => handleVariantDeletion(i)} style={{color: "#FF0303"}}></i>
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className="submitProduct d-flex flex-column justify-content-center align-items-center">
                                {loadingProduct ? <Spinner /> : ""}
                                {successLabelProduct.value ? <label htmlFor="" className="successLabel">{successLabelProduct.message}</label> : ""}
                                {apiErrorProduct.state ? <label htmlFor="" className="errorLabel">{apiErrorProduct.message}</label> : ""}
                                {isProductModalOpen.action==="add" ? 
                                    <button type="submit" onClick={handleProductForm} className="btn addProductSubmit mt-4">Submit</button>  :
                                    <button type="submit" onClick={handleProductForm} className="btn addProductSubmit mt-4">Save Changes</button>  
                                }
                            </div>
                        </form>
                    </div>
                </Modal.Body>               
            </Modal>

            {/* Add product modal */}
            <div className="modal fade" id="addProductModal" aria-labelledby="addProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content shadow-lg popup">
                        <div className="modal-body">
                            <div className="headNClose d-flex justify-content-between">
                                <p></p> {/* Added p tag to use flexbox properly */}
                                <h2 className="modal-title" id="iconListModalLabel">Add Product</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="form d-flex flex-column justify-content-start align-items-start">
                                <form action="">
                                    <label htmlFor="" className="productPic">Product Picture</label>
                                    <div className="productImage d-flex flex-column align-items-center justify-content-center" onClick={handleImageClick}>
                                        <label htmlFor="productImageInput">{image ? image.name : "Choose an image"} </label>
                                        {image ? 
                                            (typeof image === 'string' ? 
                                                <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src={image} alt="" /> : 
                                                <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src={URL.createObjectURL(image)} alt="" />
                                            ) :
                                            <img className="mt-1" style={{width: "150px", borderRadius: "10px"}} src="https://res.cloudinary.com/dokgv4lff/image/upload/v1688220885/no_image_frvfpb.jpg" alt="" />
                                        }
                                        <input type="file" name="productImageInput" ref={inputRef} onChange={productFormOnChange} className="productPicInput d-flex justify-content-center"/>
                                    </div>
                                    <div className="productDetails">
                                        <label htmlFor="" className="productPic">Product Name</label>
                                        <input type="text" id="productName" value={productForm.productName} name="productName" onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product name" />
                                        {errorProduct && productForm.productName.length===0 ? <label htmlFor="" className="errorLabel">Product Name can't be empty</label> : ""}  

                                        <label htmlFor="" className="productPic">Product Description</label>
                                        <input type="text" id="productDescription" name="productDescription" value={productForm.productDescription} onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product description" />
                                        {errorProduct && productForm.productDescription.length===0 ? <label htmlFor="" className="errorLabel">Product Description can't be empty</label> : ""}  

                                        <label htmlFor="" className="productPic">Product Price</label>
                                        <input type="number" id="productPrice" name="productPrice" value={productForm.productPrice} onChange={productFormOnChange} className="productFormInput shadow-sm" placeholder="Enter product price" />
                                        {errorProduct && productForm.productPrice===0 ? <label htmlFor="" className="errorLabel">Product price can't be 0</label> : ""}  

                                        <div className="vegRadio d-flex flex-row justify-content-center align-items-center">
                                            {productForm.vegRadio ? 
                                                (<>
                                                    <div className="vegDiv">
                                                        <input className="form-check-input radioBtn" type="radio" id="veg" onChange={productFormOnChange} checked name="vegRadio" value={true}/>
                                                        <label htmlFor="veg">Veg</label>
                                                    </div>
                                                    <div className="vegDiv">
                                                        <input className="form-check-input radioBtn" type="radio" onChange={productFormOnChange} id="nonVeg" name="vegRadio" value={false}/>
                                                        <label htmlFor="nonVeg">Non-Veg</label>
                                                    </div>
                                                </>) :
                                                (<>
                                                    <div className="vegDiv">
                                                        <input className="form-check-input radioBtn" type="radio" id="veg" onChange={productFormOnChange}  name="vegRadio" value={true}/>
                                                        <label htmlFor="veg">Veg</label>
                                                    </div>
                                                    <div className="vegDiv">
                                                        <input className="form-check-input radioBtn" type="radio" onChange={productFormOnChange} checked id="nonVeg" name="vegRadio" value={false}/>
                                                        <label htmlFor="nonVeg">Non-Veg</label>
                                                    </div>
                                                </>) 
                                            }
                                        </div>
                                    </div>
                                    <div className="variants d-flex flex-column justify-content-start align-items-start">
                                        <label htmlFor="" className="productPic">Variants <i className="fa-solid fa-circle-plus mx-1 fa-xl" onClick={handleVariantAddition} style={{color: "#004932"}}></i></label>
                                        {variantArray.map((data,i) => {
                                            return <div className="variantDetails row" key={i}>
                                                <div className="col-md-5 col-sm-5 col-5">
                                                    <input type="text" id="variantName" name="variantName" value={data.variantName || ""} onChange={e=>variantOnChange(e,i)} className="variantInput shadow-sm" placeholder="Enter variant name" />    
                                                </div>
                                                <div className="col-md-5 col-sm-5 col-5">
                                                    <input type="number" id="price" name="price" value={data.price || ""} onChange={e=>variantOnChange(e,i)} className="variantInput shadow-sm" placeholder="Enter variant price" />    
                                                </div>
                                                <div className="col-md-2 col-sm-2 col-2 d-flex flex-column justify-content-center align-items-center">
                                                    <i className="fa-solid fa-circle-minus fa-xl" onClick={() => handleVariantDeletion(i)} style={{color: "#FF0303"}}></i>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    {loadingProduct ? <Spinner /> : ""}
                                    {successLabelProduct.value ? <label htmlFor="" className="successLabel">{successLabelProduct.message}</label> : ""}
                                    {apiErrorProduct.state ? <label htmlFor="" className="errorLabel">{apiErrorProduct.message}</label> : ""}
                                    <div className="submitProduct d-flex flex-column justify-content-center align-items-center">
                                        <button type="submit" onClick={handleProductForm} className="btn addProductSubmit mt-4">Submit</button>  
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of the component */}
            <form onSubmit={handleCategoryForm}>
                <div className="container categoryForm">
                    <div className="row catNameAndIcon">
                        <div className="col-lg-6 categoryNameForm">
                            <h4 className="heading my-4">Category Name</h4>
                            <input 
                                type="text" 
                                id="categoryName" 
                                name="categoryName" 
                                value={categoryDetails.name.length>0 ? categoryDetails.name : ""} 
                                onChange={onChange} 
                                className="categoryNameInput shadow-sm" 
                                placeholder="Enter category name" 
                            />
                            {error && formData.categoryName.length===0 ? <label htmlFor="" className="errorLabel">Category Name can't be empty</label> : ""}  
                        </div>
                        <div className="col-lg-6 iconChoose d-flex flex-column justify-content-start align-items-start">
                            <h4 className="heading my-4">Category Icon</h4>
                            <button type="button" className={categoryDetails.iconId==='' ? (iconSelected.value ? "btn categoryIconSelectedBtn" : "selectIcon") : "btn categoryIconSelectedBtn"} data-bs-toggle="modal" data-bs-target="#iconListModal">
                                {categoryDetails.iconId==='' ? 
                                    (iconSelected.value ? 
                                        <Category set={false} disabled={true} iconImage={iconSelected.url} /> :
                                        <>
                                            <i className="fa-solid fa-circle-plus mx-1 fa-2xl" style={{color: "#ffffff", marginTop: "30px"}}></i>
                                            <p style={{marginTop: "10px", color: "#fff"}}>Add Icon</p>
                                        </>
                                    ) : <Category set={false} disabled={true} iconImage={categoryDetails.iconUrl} />
                                }
                            </button>
                            {error && iconSelected._id==='' ? <label htmlFor="" className="errorLabel">No category icon selected</label> : ""}  
                        </div>
                        <div className="catSave d-flex flex-column justify-content-center align-items-center">
                            {loading ? <Spinner /> : ""} 
                            {successLabel.value ? <label htmlFor="" className="successLabel">{successLabel.message}</label> : ""}
                            {apiError.state ? <label htmlFor="" className="errorLabel">{apiError.message}</label> : ""}
                            {categoryDetails.method===0 ? 
                                <button type="submit" className="btn catSaveButton my-4">Add Category</button> :
                                <button 
                                    type="button" 
                                    disabled={categoryDetails.name===beforeEditCategory.name && categoryDetails.iconId===beforeEditCategory.iconId} 
                                    onClick={handleUpdateCategory}
                                    className="btn catSaveButton my-4"
                                >Save Changes</button> 
                            }
                        </div>
                    </div>
                </div>
            </form>

            {/* Add products section */}
            <div className="products">
                <h4 className="heading my-4">Products</h4>
                {/* <button disabled={categoryDetails.id===''} type="button" className="btn addProductButton" data-bs-toggle="modal" data-bs-target="#addProductModal">Add New Product <i className="fa-solid fa-circle-plus mx-1 fa-xl" style={{color: "#ffffff"}}></i></button> */}
                <button disabled={categoryDetails.id===''} type="button" className="btn addProductButton" onClick={handleOpenProductModal}>Add New Product <i className="fa-solid fa-circle-plus mx-1 fa-xl" style={{color: "#ffffff"}}></i></button>
                <div className="allCategoryProducts row">
                    {productArray.length===0 ? 
                        <p className="noProductLabel d-flex justify-content-center">No products Added</p> : 
                        productArray.map((product) => {
                            return <div className="col-lg-6" key={product._id}>
                                <MenuItem 
                                    productImage={product.productImage.url} 
                                    productName={product.productName} 
                                    productPrice={product.price} 
                                    veg={product.veg} 
                                    description={product.description} 
                                    variants={product.variants}  
                                    productEdit={true} 
                                    productid={product._id}
                                    instock={product.inStock}
                                    onClick={(action) => handleUpDel(action, product._id, product.productName, product.description, product.price, product.veg, product.variants, product.productImage.url)}
                                />
                            </div>
                        })
                    }     
                </div>
            </div>
        </div>
    );
}
