"use client"
import Modal from "../utils/Modal"
import classes from "./products.module.css"
import { fetchBrands } from "../utils/functions"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

type AddProductModalProps = {
    open: boolean
    onClose: () => void
}

export default function AddProductModal({ open, onClose }: AddProductModalProps) {
    const { data: session } = useSession()
    const [brands, setBrands] = useState([])
    const getBrands = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/brands/`, {
            headers: {
                Authorization: `Bearer ${session?.user?.access}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => setBrands(data))
    }

    // useEffect(() => {
    //     getBrands()
    // }, [brands])

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Add Product</h3>
            <form action="" className={`${classes.product_form}`}>
                <div className="w-full">
                    <label htmlFor="product">Product name</label>
                    <input type="text" id="product" />
                </div>
                <div className="w-full">
                    <label htmlFor="quantity">Stock Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        defaultValue={1}
                        min={1}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="brand">Brand</label>
                    <select name="brand" id="brand">
                        <option value="0" disabled>
                            Brand
                        </option>
                        {/* {brands?.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))} */}
                    </select>
                </div>
                <div className="w-full">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        <option value="0" disabled>
                            Category
                        </option>
                        <option value="0">Brand</option>
                        <option value="0">Brand</option>
                    </select>
                </div>
                <div className="w-full">
                    <button type="submit">Save Product</button>
                </div>
            </form>
        </Modal>
    )
}
