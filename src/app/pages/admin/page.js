"use client";

import { ZapIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Admin() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [product, setProduct] = useState({
        manufacturer: "", // Manufacturer of the product

        model: "", // Model name of the product

        price: 0, // Price of the product

        available: false, // Availability (true/false)

        specifications: {
            processor: {
                name: "", // Processor name
                cores: 0, // Number of cores
            },
            memory: {
                size: 0, // Memory size (in GB)
                type: "", // Memory type (e.g., DDR5)
                speed: "", // Memory speed (e.g., 5600 MHz)
            },
            display: {
                size: 0, // Screen size (in inches)
                resolution: "", // Screen resolution (e.g., 2560 x 1600)
                type: "", // Display type (e.g., Mini LED)
                touchscreen: false, // Whether it supports touch input
            },
            graphics: {
                name: "", // Graphics card name
                vram: 0, // VRAM capacity (in GB)
            },
            storage: {
                type: "", // Storage type (e.g., NVMe SSD)
                capacity: 0, // Storage capacity (in GB)
            },
            battery: {
                capacity: 0, // Battery capacity (in Wh)
                runtime: "", // Runtime (e.g., "up to 10 hours")
            },
            ports: {
                type: "", // String // List of ports (e.g., "2x USB-C 4.0")
            },
        },
        weight: 0, // Weight of the product (in kg)
    });

    const postProduct = async () => {
        const res = await fetch("/api/new-in-store", {
            method: "POST",
            body: JSON.stringify(product),
        });
        const data = await res.json();
        console.log("inPostProduct data", data);
    };

    useEffect(() => {
        product.main_picture && postProduct();
    }, [product.main_picture]);

    const postImage = async (event) => {
        event.preventDefault();

        const res = await fetch("/api/image", {
            method: "POST",
            body: JSON.stringify({ data: image }),
        });
        const data = await res.json();
        console.log("imageData", data);

        setProduct((prev) => ({
            ...prev,
            main_picture: data.image._id,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }

        if (!file) setImagePreview(null);

        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const postProducts = async () => {
        const res = await fetch("/api/new-in-store", {
            method: "POST",
        });

        const data = await res.json();

        console.log(data);
    };

    useEffect(() => {
        postProducts();
    }, []);

    useEffect(() => {
        console.log(product);
        // console.log(image);
    });

    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>

            <form onSubmit={postImage}>
                <input type="file" name="image" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Preview" />}

                <label>Manufacturer:</label>
                <input
                    type="text"
                    name="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) =>
                        setProduct({ ...product, manufacturer: e.target.value })
                    }
                />
                <label>Model:</label>
                <input
                    type="text"
                    name="model"
                    value={product.model}
                    onChange={(e) =>
                        setProduct({ ...product, model: e.target.value })
                    }
                />
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            price: Number(e.target.value),
                        })
                    }
                />

                <label>Available:</label>
                <input
                    type="checkbox"
                    name="available"
                    checked={product.available}
                    onChange={(e) =>
                        setProduct({ ...product, available: e.target.checked })
                    }
                />

                <h3>Specification:</h3>
                <h4>Processor:</h4>

                <label>Name Processor:</label>
                <input
                    type="text"
                    name="name"
                    value={product.specifications.processor.name}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                processor: {
                                    ...product.specifications.processor,
                                    name: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <label>Cores:</label>
                <input
                    type="number"
                    name="cores"
                    value={product.specifications.processor.cores}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                processor: {
                                    ...product.specifications.processor,
                                    cores: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4>Memory:</h4>
                <label>Size:</label>
                <input
                    type="number"
                    name="size"
                    value={product.specifications.memory.size}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                memory: {
                                    ...product.specifications.memory,
                                    size: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={product.specifications.memory.type}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                memory: {
                                    ...product.specifications.memory,
                                    type: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <label>Speed:</label>
                <input
                    type="text"
                    name="speed"
                    value={product.specifications.memory.speed}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                memory: {
                                    ...product.specifications.memory,
                                    speed: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <h4>Display:</h4>
                <label>Size:</label>
                <input
                    type="number"
                    name="size"
                    value={product.specifications.display.size}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                display: {
                                    ...product.specifications.display,
                                    size: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <label>Resolution:</label>
                <input
                    type="text"
                    name="resolution"
                    value={product.specifications.display.resolution}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                display: {
                                    ...product.specifications.display,
                                    resolution: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={product.specifications.display.type}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                display: {
                                    ...product.specifications.display,
                                    type: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <label>Touchscreen:</label>
                <input
                    type="checkbox"
                    name="touchscreen"
                    checked={product.specifications.display.touchscreen}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                display: {
                                    ...product.specifications.display,
                                    touchscreen: e.target.checked, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4>Graphics:</h4>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={product.specifications.graphics.name}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                graphics: {
                                    ...product.specifications.graphics,
                                    name: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <label>VRAM:</label>
                <input
                    type="number"
                    name="vram"
                    value={product.specifications.graphics.vram}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                graphics: {
                                    ...product.specifications.graphics,
                                    vram: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4>Storage:</h4>
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={product.specifications.storage.type}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                storage: {
                                    ...product.specifications.storage,
                                    type: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />

                <label>capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    value={product.specifications.storage.capacity}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                storage: {
                                    ...product.specifications.storage,
                                    capacity: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4>Battery:</h4>
                <label>Capacity:</label>
                <input
                    type="number"
                    name="capacity"
                    value={product.specifications.battery.capacity}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                battery: {
                                    ...product.specifications.battery,
                                    capacity: Number(e.target.value), // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <label>Runtime:</label>
                <input
                    type="text"
                    name="runtime"
                    value={product.specifications.battery.runtime}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                battery: {
                                    ...product.specifications.battery,
                                    runtime: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4>Ports:</h4>
                <label>Type:</label>
                <input
                    type="text"
                    name="type"
                    value={product.specifications.ports.type}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            specifications: {
                                ...product.specifications,
                                ports: {
                                    ...product.specifications.ports,
                                    type: e.target.value, // Den neuen Wert zuweisen
                                },
                            },
                        })
                    }
                />
                <h4></h4>
                <label>Weight:</label>
                <input
                    type="number"
                    name="weight"
                    value={product.weight}
                    onChange={(e) =>
                        setProduct({
                            ...product,
                            weight: Number(e.target.value),
                        })
                    }
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
