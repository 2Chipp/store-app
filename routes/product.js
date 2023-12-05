import {Router} from "express"
import { validateTokenAndAdmin } from "../middlewares/validateToken.js";
import { createProduct, updateProduct, deleteProduct, getProductById, getProducts } from "../Controllers/productController.js";
const router = Router();

router.post("/", validateTokenAndAdmin, createProduct);

router.put("/:id", validateTokenAndAdmin, updateProduct);

router.delete("/:id", validateTokenAndAdmin, deleteProduct);

router.get("/:id", validateTokenAndAdmin, getProductById);

router.get("/", validateTokenAndAdmin, getProducts);

export default router