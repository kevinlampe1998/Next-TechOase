import mongoose from "mongoose";

const ComputerSchema = new mongoose.Schema(
    {
        manufacturer: {
            type: String, // Manufacturer of the product
        },
        model: {
            type: String, // Model name of the product
        },
        price: {
            type: Number, // Price of the product
        },
        available: {
            type: Boolean, // Availability (true/false)
        },
        createdAt: {
            type: Date, // Creation date
        },
        updatedAt: {
            type: Date, // Last updated date
        },
        specifications: {
            processor: {
                name: { type: String }, // Processor name
                cores: { type: Number }, // Number of cores
                baseClock: { type: String }, // Base clock speed
                turboClock: { type: String }, // Maximum turbo clock speed
            },
            memory: {
                size: { type: Number }, // Memory size (in GB)
                type: { type: String }, // Memory type (e.g., DDR5)
                speed: { type: String }, // Memory speed (e.g., 5600 MHz)
            },
            display: {
                size: { type: Number }, // Screen size (in inches)
                resolution: { type: String }, // Screen resolution (e.g., 2560 x 1600)
                type: { type: String }, // Display type (e.g., Mini LED)
                brightness: { type: Number }, // Brightness (in nits)
                touchscreen: { type: Boolean }, // Whether it supports touch input
            },
            graphics: {
                name: { type: String }, // Graphics card name
                vram: { type: Number }, // VRAM capacity (in GB)
                shared: { type: Boolean }, // Shared memory (true/false)
            },
            storage: {
                type: { type: String }, // Storage type (e.g., NVMe SSD)
                capacity: { type: Number }, // Storage capacity (in GB)
                expandable: { type: Boolean }, // Whether the storage is expandable
            },
            battery: {
                capacity: { type: Number }, // Battery capacity (in Wh)
                runtime: { type: String }, // Runtime (e.g., "up to 10 hours")
            },
            ports: {
                type: [String], // List of ports (e.g., "2x USB-C 4.0")
            },
        },
        weight: {
            type: Number, // Weight of the product (in kg)
        },
    },
    { timestamps: true }
);

const Computer =
    mongoose.models.Computer || mongoose.model("Computer", ComputerSchema);
export default Computer;
