const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: {
        url: req.file ? req.file.path : "",
        public_id: req.file ? req.file.filename : ""
      }
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.avatar.url
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // UPDATE PROFILE
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const updateData = { name, email };
//     if (req.file) {
//       updateData.avatar = {
//         url: req.file.path,
//         public_id: req.file.filename
//       };
//     }
//     const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "Profile updated successfully", user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE ACCOUNT
// exports.deleteAccount = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ message: "Account deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };