import {Router} from "express"
import { validateToken, validateTokenAndID, validateTokenAndAdmin } from "../middlewares/validateToken.js";
import { createOrder, updateOrder, deleteOrder, getUserOrders, getOrders } from "../Controllers/orderController.js";

const router = Router();

router.post("/", validateToken, createOrder);

router.put("/:id", validateTokenAndAdmin, updateOrder);

router.delete("/:id", validateTokenAndAdmin, deleteOrder);

router.get("/:userId", validateTokenAndID, getUserOrders);  

router.get("/", validateTokenAndAdmin, getOrders);



export default router