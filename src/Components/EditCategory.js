import React, { useEffect, useState } from "react";
import "../css/editcategory.css";
import Category from "./Category";
import Spinner from "./Spinner";

export default function EditCategory(props) {
    const [productArray, setProductArray] = useState([])
    const [variantArray, setVariantArray] = useState([])
    const [categoryIcons, setCategoryIcons] = useState([])
    const [formData, setFormData] = useState({categoryName: ''})
    const [iconSelected, setIconSelected] = useState({value: false, url: '', set: false, _id: ''})
    const [error, setError] = useState(false)
    const [successLabel, setSuccessLabel] = useState(false)
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState({state: false, message: ""})

    const handleVariantDeletion=(i)=>{
        const deletVal=[...variantArray]
        deletVal.splice(i,1)
        setVariantArray(deletVal)  
    }

    const handleVariantAddition = () => {
        const newArray = [...variantArray, []]
        setVariantArray(newArray)
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
            setSuccessLabel(true)
            setTimeout(() => {
                setSuccessLabel(false)
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
    }

    const onChange = (e) => {
        setApiError(false)
        setFormData({categoryName: e.target.value})
    }

    useEffect(() => {
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
                                    <div className="productImage">
                                        <label htmlFor="" className="productPic">Product Picture</label>
                                        <input type="file" className="productPicInput"/>
                                    </div>
                                    <div className="productDetails">
                                        <label htmlFor="" className="productPic">Product Name</label>
                                        <input type="text" id="productName" name="productName" className="productFormInput shadow-sm" placeholder="Enter product name" />
                                        <label htmlFor="" className="productPic">Product Description</label>
                                        <input type="text" id="productDescription" name="productDescription" className="productFormInput shadow-sm" placeholder="Enter product description" />
                                        <div className="vegRadio d-flex flex-row justify-content-center align-items-center">
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" id="veg" checked name="vegRadio" value="true"/>
                                                <label htmlFor="veg">Veg</label>
                                            </div>
                                            <div className="vegDiv">
                                                <input className="form-check-input radioBtn" type="radio" id="nonVeg" name="vegRadio" value="false"/>
                                                <label htmlFor="nonVeg">Non-Veg</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="variants d-flex flex-column justify-content-start align-items-start">
                                        <label htmlFor="" className="productPic">Variants <i className="fa-solid fa-circle-plus mx-1 fa-xl" onClick={handleVariantAddition} style={{color: "#004932"}}></i></label>
                                        {variantArray.map((data,i) => {
                                            return <div className="variantDetails row">
                                                <div className="col-md-5 col-sm-5 col-5">
                                                    <input type="text" id="variantName" name="variantName" className="variantInput shadow-sm" placeholder="Enter variant name" />    
                                                </div>
                                                <div className="col-md-5 col-sm-5 col-5">
                                                    <input type="number" id="variantPrice" name="variantPrice" className="variantInput shadow-sm" placeholder="Enter variant price" />    
                                                </div>
                                                <div className="col-md-2 col-sm-2 col-2 d-flex flex-column justify-content-center align-items-center">
                                                    <i class="fa-solid fa-circle-minus fa-xl" onClick={() => handleVariantDeletion(i)} style={{color: "#FF0303"}}></i>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div className="submitProduct d-flex flex-column justify-content-center align-items-center">
                                        <button type="submit" className="btn addProductSubmit mt-4">Submit</button>  
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
                            <input type="text" id="categoryName" name="categoryName" onChange={onChange} className="categoryNameInput shadow-sm" placeholder="Enter category name" />
                            {error && formData.categoryName.length===0 ? <label htmlFor="" className="errorLabel">Category Name can't be empty</label> : ""}  
                        </div>
                        <div className="col-lg-6 iconChoose d-flex flex-column justify-content-start align-items-start">
                            <h4 className="heading my-4">Category Icon</h4>
                            <button type="button" className={iconSelected.value ? "btn categoryIconSelectedBtn" : "selectIcon"} data-bs-toggle="modal" data-bs-target="#iconListModal">
                                {iconSelected.value ? 
                                    <Category set={false} disabled={true} iconImage={iconSelected.url} /> :
                                    <>
                                        <i className="fa-solid fa-circle-plus mx-1 fa-2xl" style={{color: "#ffffff", marginTop: "30px"}}></i>
                                        <p style={{marginTop: "10px", color: "#fff"}}>Add Icon</p>
                                    </>
                                }
                            </button>
                            {error && iconSelected._id==='' ? <label htmlFor="" className="errorLabel">No category icon selected</label> : ""}  
                        </div>
                        <div className="catSave d-flex flex-column justify-content-center align-items-center">
                            {loading ? <Spinner /> : ""} 
                            {successLabel ? <label htmlFor="" className="successLabel">Category Created!!</label> : ""}
                            {apiError.state ? <label htmlFor="" className="errorLabel">{apiError.message}</label> : ""}
                            <button type="submit" className="btn catSaveButton my-4">Add Category</button>
                        </div>
                    </div>
                </div>
            </form>


            <div className="products">
                <h4 className="heading my-4">Products</h4>
                <button type="button" className="btn addProductButton" data-bs-toggle="modal" data-bs-target="#addProductModal">Add New Product <i className="fa-solid fa-circle-plus mx-1 fa-xl" style={{color: "#ffffff"}}></i></button>
                <div className="allCategoryProducts row">
                    {productArray.length===0 ? <p className="noProductLabel d-flex justify-content-center">No products Added</p> : '' }
                    
                    {/* <div className="col-lg-6">
                        <MenuItem productImage='https://res.cloudinary.com/dokgv4lff/image/upload/v1687949725/jvchepuwxamzxtbnwcwh.jpg' productName="Veg Burger" productPrice="50" veg="true" description="Veg Burger" />
                    </div> */}
                        
                </div>
            </div>
        </div>
    );
}
