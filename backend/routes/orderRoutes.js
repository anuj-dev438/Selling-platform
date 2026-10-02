const express =require("express")
const{
    createOrder,getOrder,updateOrderStatus,traceOrder
}=require("../controllers/orderController")

const protect =require("../middleware/authMiddleware")

const router =express.Router();

//customer

router.post("/",createOrder)

//Admin
router.get("/",protect,getOrder);
router.put("/:id/status",protect,updateOrderStatus)
router.get("/track/:orderId",traceOrder)

module.exports = router