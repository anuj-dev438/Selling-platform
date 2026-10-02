const express = require("express");

const {
    createProduct,
    getProducts,
    updateProduct,
      deleteProduct
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public API
router.get("/", getProducts);

// Admin APIs
router.post("/", protect, createProduct);
//ipdate 
router.put("/:id", protect, updateProduct);

//delete
router.delete("/:id", protect, deleteProduct);

module.exports = router;