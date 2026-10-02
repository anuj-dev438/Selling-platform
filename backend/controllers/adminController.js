
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ================= CREATE ADMIN =================

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= ADMIN LOGIN =================

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Check email and password
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and Password both required"
            });
        }

        // Find Admin
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check Password
        const isPassword = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        );

        // Send Response
        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createAdmin,
    loginAdmin
};
