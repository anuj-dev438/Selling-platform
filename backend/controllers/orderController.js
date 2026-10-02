
const Order = require("../models/Order");


// =========================
// CREATE ORDER
// =========================

const createOrder = async (req, res) => {
    try {

        const {
         
            customer,
            items,
            totalAmount,
        } = req.body;


        // Validation

        if (
            !customer ||
            !customer.name ||
            !customer.phone ||
            !customer.address ||
            !items ||
            items.length === 0 ||
            totalAmount === undefined
        ) {
            return res.status(400).json({
                message: "All order details are required"
            });
        }


        // Create order
const orderId = "FS-" +Date.now().toString().slice(-8)
        const order = await Order.create({
            orderId,
            customer,
            items,
            totalAmount
        });


        console.log("ORDER CREATED:", order);


        // IMPORTANT:
        // Send complete order to frontend



        return res.status(201).json({
            message: "Order created successfully",
            order: order
        });

    } catch (error) {

        console.log("CREATE ORDER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



// =========================
// GET ALL ORDERS
// =========================

const getOrder = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("items.product")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            orders: orders
        });

    } catch (error) {

        console.log("GET ORDERS ERROR:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};



// =========================
// UPDATE ORDER STATUS
// =========================

const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;


        const order = await Order.findByIdAndUpdate(
            id,
            {
                status: status
            },
            {
                new: true,
                runValidators: true
            }
        );


        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        return res.status(200).json({
            message: "Order status updated successfully",
            order: order
        });

    } catch (error) {

        console.log(
            "UPDATE ORDER STATUS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

//Trace ORDEr BY Order Id

const traceOrder =async(req,res)=>{
    try{
        const {orderId}=req.params;
        const order = await Order.findOne({orderId})
    if(!order){
        return res.status(404).json({
            message: "Order not found"
        })
    }
    return res.status(200).json({
        orderId: order.orderId,
        status: order.status,
        customer: {
            name: order.customer.name
        },
        totalAmount: order.totalAmount,
        createdAt: order.createdAt
    })
}catch(error){
    console.log("Track order error:",error);
    return res.status(500).json({
        message: "Internal server error"
    })
        
      
}
}

const sendOrderOnWhatsApp = () => {

}


module.exports = {
    createOrder,
    getOrder,
    updateOrderStatus,
    traceOrder,
    sendOrderOnWhatsApp
};

