import mongoose from "mongoose";

import Image from "../Image.js";

const ComputerSchema = new mongoose.Schema(
    {
        manufacturer: {
            type: String, // Manufacturer of the product
        },
        model: {
            type: String, // Model name of the product
        },
        main_picture: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },

        price: {
            type: Number, // Price of the product
        },
        available: {
            type: Boolean, // Availability (true/false)
        },
        specifications: {
            processor: {
                name: { type: String }, // Processor name
                cores: { type: Number }, // Number of cores
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
                touchscreen: { type: Boolean }, // Whether it supports touch input
            },
            graphics: {
                name: { type: String }, // Graphics card name
                vram: { type: Number }, // VRAM capacity (in GB)
            },
            storage: {
                type: { type: String }, // Storage type (e.g., NVMe SSD)
                capacity: { type: Number }, // Storage capacity (in GB)
            },
            battery: {
                capacity: { type: Number }, // Battery capacity (in Wh)
                runtime: { type: String }, // Runtime (e.g., "up to 10 hours")
            },
            ports: { type: { type: String } }, // List of ports (e.g., "2x USB-C 4.0")
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
