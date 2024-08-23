import React, { useEffect, useState } from "react";
import ProductModal from './ProductModal'
import { useOutletContext } from "react-router-dom";

const ShopView = () => {
    const [isShown, setIsShown] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [listOfProducts, setListOfProducts] = useState([])
    const routeProps = useOutletContext()
    const { getProductList } = routeProps
    const productsFromLocalStorage = JSON.parse(localStorage.getItem('product-lists'))
    const [appliedFilter, setAppliedFilter] = useState({})
    // const [appliedFilter, setAppliedFilter] = useState({ option: 'Stock', fields: ['In Stock', 'Out Of Stock'] })
    const [filterOptions, setFilterOptions] = useState(['', 'Stock', 'Rating', 'Wishlist', 'Cart'])
    const [selectedFilter, setSelectedFilter] = useState({})
    // const [selectedFilter, setSelectedFilter] = useState({ filterType: appliedFilter.option, filterValue: '' })
    const [filteredRecord, setFilteredRecord] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})

    window.onbeforeunload = function (event) {
        console.log('before refresh')
        localStorage.setItem('product-lists', JSON.stringify(listOfProducts))
    };

    useEffect(() => {
        setAllProducts(productsFromLocalStorage)
        setListOfProducts(productsFromLocalStorage)
        setFilteredRecord(productsFromLocalStorage)
        return () => {
            console.log('un mounted')
        }
    }, [])

    useEffect(() => {
        getProductList(listOfProducts)
    }, [listOfProducts])

    const closeModal = () => {
        setIsShown(false)
        setSelectedProduct({})
    }

    const updateTheListOfProducts = (product, isEdit) => {
        if (!isEdit) {
            setAllProducts([...listOfProducts, product])
            setListOfProducts([...listOfProducts, product])
            setFilteredRecord([...listOfProducts, product])
            localStorage.setItem('product-lists', JSON.stringify([...listOfProducts, product]))
        } else {
            const idxOfEditedProduct = listOfProducts.findIndex((e) => e.id === product.id)
            const updatedListOfProducts = [...listOfProducts]
            updatedListOfProducts.splice(idxOfEditedProduct, 1, product)
            setListOfProducts([...updatedListOfProducts])
            setFilteredRecord([...updatedListOfProducts])
            setAllProducts([...updatedListOfProducts])
            localStorage.setItem('product-lists', JSON.stringify([...updatedListOfProducts]))
            // console.log('==> product', product)
            // console.log('==> idxOfEditedProduct', idxOfEditedProduct)
        }
    }

    const deleteProduct = (id, i) => {
        const updatedProducts = [...listOfProducts]
        const deleteProductIdx = updatedProducts.findIndex((product) => product.id === id)
        updatedProducts[deleteProductIdx]['isDeleted'] = true
        console.log('==> updatedProducts', updatedProducts)
        // updatedProducts.splice(i, 1)
        setAllProducts([...updatedProducts])
        setListOfProducts([...updatedProducts])
        setFilteredRecord([...updatedProducts])
        localStorage.setItem('product-lists', JSON.stringify([...updatedProducts]))
    }

    const editProduct = (product, i) => {
        // console.log('==> product', product)
        // console.log('==> i', i)
        setSelectedProduct(product)
        setIsShown(true)
    }

    const AddToWishlist = (product, i, key) => {
        const updatedProduct = { ...product, [key]: !product?.[key] }
        if (key === 'inCart' && updatedProduct[key]) {
            updatedProduct['inWishlist'] = false
        }
        if (key === 'inWishlist' && updatedProduct[key]) {
            updatedProduct['inCart'] = false
        }
        const updatedListOfProducts = [...listOfProducts]
        updatedListOfProducts.splice(i, 1, updatedProduct)
        setListOfProducts([...updatedListOfProducts])
        setFilteredRecord([...updatedListOfProducts])
        setAllProducts([...updatedListOfProducts])
        localStorage.setItem('product-lists', JSON.stringify([...updatedListOfProducts]))
    }

    const updateAppliedFilter = (e) => {
        clearFilters()
        // console.log(e.target.value)
        switch (e.target.value) {
            case 'Stock':
                setAppliedFilter({ option: e.target.value, fields: ['', { label: 'In Stock', value: true }, { label: 'Out Of Stock', value: false }] })
                break;
            case 'Wishlist':
                setAppliedFilter({ option: e.target.value, fields: ['', { label: 'In Wishlist', value: true }, { label: 'Not In Wishlist', value: false }] })
                break;
            case 'Cart':
                setAppliedFilter({ option: e.target.value, fields: ['', { label: 'In Cart', value: true }, { label: 'Not In Cart', value: false }] })
                break;
            case 'Rating':
                setAppliedFilter({ option: e.target.value, fields: ['', 1, 2, 3, 4, 5] })
                break;
            default:
                break;
        }
    }

    const filterToBeApplied = (e) => {
        // console.log('==> filterToBeApplied', appliedFilter, e.target.value)
        setSelectedFilter({
            filterType: appliedFilter.option,
            filterValue: e.target.value
        })
    }

    const applyFilter = () => {
        if (!selectedFilter.filterValue) {
            setFilteredRecord(listOfProducts)
            localStorage.setItem('product-lists', JSON.stringify(listOfProducts))
            return
        }
        const filterVal = ['Wishlist', 'Cart', 'Stock']
        const isNotRating = filterVal.includes(selectedFilter.filterType)
        if (isNotRating) {
            let isTrue = false
            let key = ''
            switch (selectedFilter.filterType) {
                case 'Wishlist':
                    key = 'inWishlist'
                    break;
                case 'Cart':
                    key = 'inCart'
                    break;
                case 'Stock':
                    key = 'inStock'
                default:
                    break;
            }
            for (let filterValue of appliedFilter.fields) {
                if (filterValue.label === selectedFilter.filterValue) {
                    isTrue = filterValue.value
                }
            }
            let filteredArray = listOfProducts.filter((product) => product[key] === isTrue)
            setFilteredRecord(filteredArray)
            localStorage.setItem('product-lists', JSON.stringify(filteredArray))
            // console.log('==> filteredArray', filteredArray)
        }
    }

    const renderFilters = () => {
        return (
            <div>
                Filter Options
                <select value={appliedFilter.option} onChange={updateAppliedFilter}>
                    {filterOptions.map((option, i) => <option key={i}>{option}</option>)}
                </select>
                {appliedFilter.option && <select value={selectedFilter.filterValue} onChange={filterToBeApplied}>
                    {appliedFilter?.fields?.map((field, i) => <option key={i}>{field.label}</option>)}
                </select>}
                <div>
                    <button onClick={applyFilter}>Apply Filter</button>
                </div>
            </div>
        )
    }

    const clearFilters = () => {
        setAppliedFilter({
            option: '',
            fields: []
        })
        setSelectedFilter({
            filterType: '',
            filterValue: ''
        })
        localStorage.setItem('product-lists', JSON.stringify(listOfProducts))
        setFilteredRecord(listOfProducts)
    }

    return (
        <div className="shop-view-container">
            ShopView
            {isShown && (
                <ProductModal selectedProduct={selectedProduct} closeModal={closeModal} updateTheListOfProducts={updateTheListOfProducts} />
            )}
            {!isShown && (<div>
                <button onClick={() => setIsShown(true)}>Add Product</button>
                <div>
                    <div>
                        Clear Filter
                        <button onClick={clearFilters}> x </button>
                    </div>
                    Filter
                    {renderFilters()}
                </div>
                <div className="product-container">
                    {productsFromLocalStorage.length > 0 && (
                        // {listOfProducts.length > 0 && (
                        <div className="product-list">
                            {productsFromLocalStorage.map((product, i) => {
                                // {listOfProducts.map((product, i) => {
                                return !product.isDeleted && (
                                    <div className="product" key={product.id}>
                                        <div>
                                            <p>Product Name - {product.productName}</p>
                                            <p>Product Price - {product.price}</p>
                                            <p>Product Rating - {product.rating}</p>
                                            <p>Product Instock - {product.inStock ? 'Yes' : 'No'}</p>
                                        </div>
                                        <br />
                                        <div>
                                            <p onClick={() => AddToWishlist(product, i, 'inWishlist')}>{product.inWishlist ? ' Remove from Wishlist' : 'Add To Wishlist'}</p>
                                            <p onClick={() => AddToWishlist(product, i, 'inCart')}>{product.inCart ? ' Remove from Cart' : 'Add To Cart'}</p>
                                            <p onClick={() => deleteProduct(product.id, i)}>Delete</p>
                                            <p onClick={() => editProduct(product, i)}>Edit</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>)}
        </div>
    )
}

export default ShopView