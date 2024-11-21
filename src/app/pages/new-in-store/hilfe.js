<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    {products.map((product) => (
        <div
            key={product._id}
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                textAlign: "center",
            }}
        >
            {/* <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
        /> */}
            <h3>{product.model}</h3>
            <p>Manufacturer: {product.manufacturer}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
        </div>
    ))}
</div>;
