import {Router} from "express"
import { validateToken, validateTokenAndID, validateTokenAndAdmin } from "../middlewares/validateToken.js";
import { createCart, updateCart, deleteCart, getUserCart, getCartList } from "../Controllers/cartController.js"

const router = Router();

router.post("/", validateToken, createCart);

router.put("/:id", validateTokenAndID, updateCart);

router.delete("/:id", validateTokenAndID, deleteCart);

router.get("/:userId", validateTokenAndID, getUserCart);

router.get("/", validateTokenAndAdmin, getCartList);

export default router