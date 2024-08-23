import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import './Shop.css'
import Carousel from "./Carousel";

const ShopHome = () => {
    const [shoppingProducts, setShoppingProducts] = useState([])
    const [isShopHome, setIsShopHome] = useState(false)
    // const allProducts = JSON.parse(localStorage.getItem('product-lists'))
    const location = useLocation()

    useEffect(() => {
        setShoppingProducts(JSON.parse(localStorage.getItem('product-lists')))
    }, [])
    useEffect(() => {
        const shomeHome = '/shop'
        setIsShopHome(shomeHome === location.pathname)
    }, [location.pathname])

    const draggableOrder = (productSelected, fromKey, toKey, neareastProduct) => {
        const updatedListOfProducts = [...shoppingProducts]
        const product = { ...productSelected }
        if (fromKey !== 'allProduct') {
            product[fromKey] = false
        }
        if (toKey !== 'allProduct') {
            product[toKey] = true
        }
        const draggedProductIdx = updatedListOfProducts.findIndex((e) => e.id === product.id)
        const neareastProductIdx = updatedListOfProducts.findIndex((e) => e.id === neareastProduct.id)
        updatedListOfProducts.splice(draggedProductIdx, 1)
        updatedListOfProducts.splice(neareastProductIdx, 0, product)
        // console.log('==> drag drop product', product)
        // console.log('==> all product', updatedListOfProducts)
        setShoppingProducts([...updatedListOfProducts])
        localStorage.setItem('product-lists', JSON.stringify([...updatedListOfProducts]))
    }

    const restoreProducts = (restoredProducts) => {
        const updatedProducts = [...shoppingProducts]
        restoredProducts.forEach((product) => {
            product['isDeleted'] = false
            const restoredProductIdx = updatedProducts.findIndex((e) => e.id === product.id)
            updatedProducts.splice(restoredProductIdx, 1, product)
        })
        setShoppingProducts([...updatedProducts])
        localStorage.setItem('product-lists', JSON.stringify([...updatedProducts]))
    }

    const deletePermanently = (productsToBeDeleted) => {
        const updatedListOfProducts = [...shoppingProducts]
        productsToBeDeleted.forEach((product) => {
            const productToBeDeletedIdx = updatedListOfProducts.findIndex((e) => e.id === product.id)
            updatedListOfProducts.splice(productToBeDeletedIdx, 1)
        })
        setShoppingProducts([...updatedListOfProducts])
        localStorage.setItem('product-lists', JSON.stringify([...updatedListOfProducts]))
    }

    const getProductList = (products) => {
        setShoppingProducts([...products])
    }
    return (
        <div className="shop-home">
            Shop
            <div className="header">
                <nav>
                    <ul>
                        <li><Link to={`/shop`}>Shop home</Link></li>
                        <li><Link to={`view`}>Shop View</Link></li>
                        <li><Link to={`table`}>Tabular view</Link></li>
                        <li><Link to={`recycle`}>Recycle</Link></li>
                        <li>cart - {shoppingProducts.filter(product => product.inCart).length}</li>
                    </ul>
                </nav>
                <Outlet context={{ getProductList, from: 'parent', shoppingProducts, draggableOrder, restoreProducts, deletePermanently }} />
                {isShopHome && <Carousel />}
            </div>
        </div>
    )
}

export default ShopHome