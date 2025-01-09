const { Admin } = require('../models/models'); // Assuming an Admin model exists
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key'; // Replace this with a secure secret key

const AdminController = {
    // Admin Signup
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            // Check if email already exists
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new admin
            const newAdmin = new Admin({
                name,
                email,
                password: hashedPassword,
            });

            const savedAdmin = await newAdmin.save();
            res.status(201).json({ message: 'Admin registered successfully', data: savedAdmin });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering admin' });
        }
    },

    // Admin Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find admin by email
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Compare password
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    // Get Admin Profile
    getProfile: async (req, res) => {
        try {
            const adminId = req.adminId; // Extracted from JWT middleware
            const admin = await Admin.findById(adminId).select('-password'); // Exclude password

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            res.status(200).json({ data: admin });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching admin profile' });
        }
    },
};

module.exports = AdminController;
