"use client";

import { useState, useEffect } from "react";

export default function Admin() {
    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                />
                <button type="submit">Add Product</button>
            </form>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                        <button
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
