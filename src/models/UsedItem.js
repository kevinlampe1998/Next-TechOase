import mongoose from 'mongoose';

const usedItemSchema = new mongoose.Schema({
    user_who_sells: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seller_name: String,
    product_name: String,
    main_picture: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    other_pictures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    description: String,
    price: String,
    condition: { type: String, enum: ['New', 'Used'], required: true },
    category: {
        type: String,
        required: true,
        enum: [
          'Computers & Laptops',
          'Components',
          'Peripherals',
          'Networking',
          'Mobile Devices',
          'Gaming',
          'Audio & Video',
          'Smart Home',
        ],
      },
      subcategory: {
        type: String,
        required: true,
        enum: [
          // Computers & Laptops
          'Gaming Laptops', 'Ultrabooks', 'MacBooks', 'Business Laptops', '2-in-1 Laptops',
          'Desktop PCs', 'All-in-One PCs',
    
          // Components
          'Processors', 'Graphics Cards', 'Motherboards', 'RAM', 'Storage Drives', 'Power Supplies',
          'Cooling Systems', 'PC Cases', 'Optical Drives',
    
          // Peripherals
          'Monitors', 'Keyboards', 'Mice', 'Headsets', 'Webcams', 'Printers', 'External Hard Drives',
          'Docking Stations', 'Game Controllers',
    
          // Networking
          'Routers', 'Modems', 'NAS Systems', 'Wi-Fi Extenders', 'Network Switches', 'Access Points',
    
          // Mobile Devices
          'Smartphones', 'Tablets', 'Smartwatches', 'Phone Accessories', 'Chargers', 'Power Banks',
          'Phone Cases', 'Screen Protectors',
    
          // Gaming
          'Consoles', 'VR Headsets', 'Gaming Chairs', 'Gaming Desks', 'Gaming Mice', 'Gaming Keyboards',
          'Gaming Headsets', 'Graphics Cards', 'Game Bundles',
    
          // Audio & Video
          'TVs', 'Soundbars', 'Microphones', 'Speakers', 'Earphones', 'Headphones', 'Projectors',
          'Cameras', 'Action Cameras', 'Drones',
    
          // Smart Home
          'Smart Speakers', 'Smart Bulbs', 'Security Cameras', 'Smart Thermostats', 'Smart Plugs',
          'Smart Locks', 'Smart Sensors', 'Smart Displays',
        ],
      },
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
}, { timestamps: true });

export default mongoose.models.UsedItem || mongoose.model('UsedItem', usedItemSchema);  