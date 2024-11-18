import { useState, useEffect } from "react";

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const handleAddProduct = async () => {
        await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setFormData({ name: "", price: "", description: "" });
        fetchProducts();
    };

    const handleDeleteProduct = async (id) => {
        await fetch("/api/products", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        fetchProducts();
    };

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
