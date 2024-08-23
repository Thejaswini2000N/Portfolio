import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const TabularView = (props) => {
    const [draggedProduct, setDraggedProduct] = useState('')
    const [dragFrom, setDragFrom] = useState('')
    const [dropTo, setDropTo] = useState('')
    const [neareastProduct, setNearestProduct] = useState('')
    const routeProps = useOutletContext()
    const { shoppingProducts, draggableOrder } = routeProps
    const products = shoppingProducts.filter((product) => !product.inWishlist && !product.inCart)
    const productsInWishlist = shoppingProducts.filter((product) => product.inWishlist)
    const productsInCart = shoppingProducts.filter((product) => product.inCart)
    // onDragEnter, onDragStart, OnDragEnd, OnDragOVer

    const resetDraggedItems = () => {
        setDraggedProduct('')
        setDragFrom('')
        setDropTo('')
        setNearestProduct('')
    }

    const dragEnterProduct = (e, product) => {
        console.log('==> dragEnterProduct', product)
        setNearestProduct(product)
    }

    const dragStartProduct = (e, product) => {
        let draggableFrom = e.target.closest('.droppable-container')?.dataset?.product
        setDraggedProduct(product)
        setDragFrom(draggableFrom)
    }

    const dragEndProduct = (e) => {
        // console.log('==> dragEndProduct', e.target.closest('.list-of-products'))
        draggableOrder(draggedProduct, dragFrom, dropTo, neareastProduct)
        resetDraggedItems()
    }

    const dragOverProduct = (e) => {
        e.preventDefault()
        let droppableContainer = e.target.closest('.droppable-container')?.dataset?.product
        setDropTo(droppableContainer)
    }

    return (
        <div className="table-view-container">
            Tabular View component
            <div className="view-container" onDragOver={(e) => dragOverProduct(e)}>
                <div data-product='allProduct' className="table-product-container droppable-container">
                    <div>Products</div>
                    <hr />
                    {products.map((product) => {
                        return (
                            <div onDragEnter={(e) => dragEnterProduct(e, product)} onDragStart={(e) => dragStartProduct(e, product)}
                                onDragEnd={(e) => dragEndProduct(e, product)} className="list-of-products" draggable='true' key={product.id}>
                                {product.productName}
                            </div>
                        )
                    })}
                </div>
                <div data-product='inWishlist' className="table-wishlist-container droppable-container">
                    <div>Wishlist Products</div>
                    <hr />
                    {productsInWishlist.map((product) => {
                        return (
                            <div onDragEnter={(e) => dragEnterProduct(e, product)} onDragStart={(e) => dragStartProduct(e, product)}
                                onDragEnd={(e) => dragEndProduct(e, product)} className="list-of-products" draggable='true' key={product.id}>
                                {product.productName}
                            </div>
                        )
                    })}
                </div>
                <div data-product='inCart' className="table-cart-container droppable-container">
                    <div>Cart Products</div>
                    <hr />
                    {productsInCart.map((product) => {
                        return (
                            <div onDragEnter={(e) => dragEnterProduct(e, product)} onDragStart={(e) => dragStartProduct(e, product)}
                                onDragEnd={(e) => dragEndProduct(e, product)} className="list-of-products" draggable='true' key={product.id}>
                                {product.productName}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TabularView