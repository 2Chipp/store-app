import Router from "express"
import { payment } from "../Controllers/stripeController.js";

const router = Router();

router.post("/payment", payment);

export default router