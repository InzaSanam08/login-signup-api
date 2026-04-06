const express = require('express');
const router = express.Router();

const { 
    signup, 
    login, 
    logout, 
    getProfile, 
    updateProfile, 
    deleteAccount 
} = require('../controllers/authController');

// Middlewares  
const upload = require('../middlewares/multer');
const { protect } = require('../middlewares/authMiddleware');  

// --- ROUTES ---
router.post('/signup', upload.single('image'), signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', protect, getProfile);
// router.put('/profile', protect, upload.single('image'), updateProfile);
// router.delete('/profile', protect, deleteAccount);
module.exports = router;