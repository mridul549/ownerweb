import { React, useEffect, useState, useContext } from "react";
import MenuItem from "./MenuItem";
import Category from "./Category";
import Spinner from "./Spinner";
import { Link, useNavigate } from 'react-router-dom'
import "../css/menu.css";
import CategoryContext from "../context/category/categoryContext";

export default function Menu() {
    
    let [categoryArray, setCategoryArray] = useState([])
    let [productArray, setProductArray] = useState([])
    const [loadingCat, setLoadingCat] = useState(false)
    const [loadingPro, setLoadingPro] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { categoryDetails, setCategoryDetails } = useContext(CategoryContext)
    const navigate = useNavigate()

    const handleEditCategory = (id,name,iconUrl,iconId) => {
        setCategoryDetails({id: id, name: name, iconUrl: iconUrl, iconId: iconId})
        navigate('/dashboard/editcategory')
    }

    const handleCategoryClick =  async (category) => {
        // Add your logic here
        setLoadingPro(true);
        setSelectedCategory(category);
        const response1 = await fetch(`https://flavr.tech/products/getProductsByCategory?categoryName=${category}&outletid=${localStorage.getItem('selectedOutlet')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const json1 = await response1.json()
        setLoadingPro(false);
        setProductArray(json1.categoryArray)
    };

    useEffect(() => {
        async function fetchData () {
            setCategoryDetails({id: '', name: '', iconUrl: '', iconId: ''})
            setLoadingCat(true);
            setLoadingPro(true);
            const response = await fetch(`https://flavr.tech/products/getAllCategories?outletid=${localStorage.getItem('selectedOutlet')}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const json = await response.json()
            setLoadingCat(false);
            setSelectedCategory("All")
            setCategoryArray(json.categories)

            const response1 = await fetch(`https://flavr.tech/products/getProductsByCategory?categoryName=All&outletid=${localStorage.getItem('selectedOutlet')}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const json1 = await response1.json()
            setLoadingPro(false);
            setProductArray(json1.categoryArray)
        }
        fetchData()
    },[])

    return (
        <div className="container-fluid my-5 main-div" style={{ padding: 0, margin: 0 }}>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <h2 className="categoryHead my-5">Categories </h2>
                <Link to={'/dashboard/editcategory'}><i className="fa-solid fa-circle-plus fa-2xl plus" style={{color: "#004932"}} ></i></Link>
            </div>
            {loadingCat && <Spinner />}
            <div className="col container categoryContainer">
                <div className="categoryScroll">
                    {!loadingCat&& 
                        <div className="categoryButton">
                            <Category iconImage="https://res.cloudinary.com/dokgv4lff/image/upload/v1687859411/l54onuf6o0lyy2afrjyv.png" head="All" onClick={() => handleCategoryClick("All")} set={selectedCategory==="All"}/>
                        </div>
                    }
                    {categoryArray.map((category) => {
                        const isSelected = selectedCategory === category.category;
                        return <div className="categoryButton" key={category.count.icon._id}>
                            <Category iconImage={category.count.icon.icon.url} head={category.category} onClick={() => handleCategoryClick(category.category)} set={isSelected}/>
                        </div>
                    })}
                </div>
            </div>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <h2 className="categoryHead my-2" style={{paddingTop: "50px"}}>Products </h2>
            </div>
            {loadingPro && <Spinner />}
            {!loadingPro&&productArray.map((productWithCat) => {
                return <>
                    <div className="categoryName d-flex flex-row justify-content-start align-items-center">
                        <h2 className="categoryHead my-5">{productWithCat.category}</h2>
                        <i 
                            className="fa-sharp fa-solid fa-pen icon editIcon fa-lg" 
                            onClick={() => handleEditCategory(productWithCat.products[0].category._id, productWithCat.category, productWithCat.products[0].category.icon.icon.url, productWithCat.products[0].category.icon._id)}>
                        </i>
                    </div>
                    <div className="row">
                        {productWithCat.products.map((product) => {
                            return <div className="col-lg-6">
                                <MenuItem productImage={product.productImage.url} productName={product.productName} productPrice={product.price} veg={product.veg} description={product.description} />
                            </div>
                        })}
                    </div>
                </>
            })}

        </div>
    );
}