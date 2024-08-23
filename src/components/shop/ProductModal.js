import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const ProductModal = (props) => {
    const [productDetail, setProductDetail] = useState({
        productName: '',
        price: '',
        rating: '',
        inStock: true,
        isDeleted: false,
        inWishlist: false,
        inCart: false
    })

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        // selectedProduct
        // id: "c48fc8cd-ad93-4031-81b6-056e157b81df"
        // inCart: false
        // inStock: true
        // inWishlist: true
        // isDeleted: false
        // price: "-26"
        // productName: "ps 5"
        // rating: "1"
        if (selectedProduct?.id) {
            setProductDetail(selectedProduct)
            setIsEdit(true)
        }
    }, [])
    const { closeModal, updateTheListOfProducts, selectedProduct } = props
    // console.log('==> selectedProduct', selectedProduct)

    const productData = (e, key) => {
        setProductDetail({ ...productDetail, [key]: e.target.value })
    }

    const submitForm = (e) => {
        e.preventDefault()
        let allFieldsFilled = true
        for (let key in productDetail) {
            if (productDetail[key] === '') {
                allFieldsFilled = false
                alert(`Fill the ${key}`)
                return
            }
        }
        if (allFieldsFilled) {
            if (selectedProduct?.id) {
                updateTheListOfProducts(productDetail, isEdit)
                // console.log('==> productDetail', productDetail)
            } else {
                setProductDetail({ ...productDetail, id: uuidv4() })
                const ProductDetailObj = { ...productDetail, id: uuidv4() }
                updateTheListOfProducts(ProductDetailObj, isEdit)
            }
            closeModal()
        }
        // console.log('==> product detail', productDetail)
    }

    return (
        <div className="modal-container">
            <div onClick={closeModal} className="overlay"></div>
            <div className="form-container">
                <form className="form">
                    <div>
                        <div>
                            <label htmlFor="product-name">Product Name</label>
                            <input value={productDetail.productName} onChange={(e) => productData(e, 'productName')} id="product-name" type="text" />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input value={productDetail.price} onChange={(e) => productData(e, 'price')} id="price" type="number" />
                        </div>
                        <div>
                            <label htmlFor="rating">Rating</label>
                            <input value={productDetail.rating} onChange={(e) => productData(e, 'rating')} id="rating" type="text" min={1} max={5} />
                        </div>
                    </div>
                    <div>
                        <button onClick={submitForm}>Submit</button>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </form>
                Add / Edit
            </div>
        </div>
    )
}

export default ProductModal