const Product = require("../models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { name, price, image, category } = req.body;

        if (!name || price === undefined || !image || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const product = await Product.create({
            name,
            price,
            image,
            category
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            products
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
//UPDATE
// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("UPDATE PRODUCT ID:", id);
        console.log("UPDATE PRODUCT DATA:", req.body);

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                category: req.body.category
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.log("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


//Delete 

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("DELETE PRODUCT ID:", id);

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log("DELETE ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
};