const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage: storage });
