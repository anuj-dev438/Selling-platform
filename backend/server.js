const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware")
const productRoutes =require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes")
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/orders",orderRoutes)
app.get("/api/admin-test",protect,(req,res)=>{
    res.json({
        message: "Admin Api accessed successfully",
        admin: req.admin

    })
})

app.get("/", (req, res) => {
    res.json({
        message: "Food shop backend is working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});