import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const RecycleBin = () => {
    const [selectedProducts, setSelectedProducts] = useState('')
    const routeProps = useOutletContext()
    console.log('==> routeProps', routeProps)
    const { shoppingProducts, restoreProducts, deletePermanently } = routeProps

    const updateSelectedProducts = (e, product) => {
        if (e.target.checked) {
            setSelectedProducts([...selectedProducts, product])
        } else {
            const updatedProducts = selectedProducts.filter((e) => product.id !== e.id)
            setSelectedProducts([...updatedProducts])
        }
    }

    const restoreProduct = () => {
        restoreProducts(selectedProducts)
    }

    const deletePermanent = () => {
        deletePermanently(selectedProducts)
    }

    return (
        <div className="recycle-container">
            <div className="recycle-header">
                <div>RecycleBin</div>
                <div className="restore-container">
                    <p onClick={restoreProduct}>Restore</p>
                    <p onClick={deletePermanent}>Delete</p>
                </div>
            </div>
            <div>
                Deleted Products
                {
                    shoppingProducts.map((product) => {
                        return product.isDeleted && (
                            <div>
                                <input value={selectedProducts.includes(product.id)} onChange={(e) => updateSelectedProducts(e, product)} type="checkbox" />
                                <span key={product.id}>{product.productName}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RecycleBin