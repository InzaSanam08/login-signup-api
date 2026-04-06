const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'app_users', 
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const upload = multer({ storage });
module.exports = upload;