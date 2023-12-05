import {Router} from "express"
import { validateTokenAndID, validateTokenAndAdmin } from "../middlewares/validateToken.js";
import {update, getUserById, getUsers} from "../Controllers/userController.js"

const router = Router();

router.put("/:id", validateTokenAndID, update);

router.get("/:id", validateTokenAndAdmin, getUserById);

router.get("/", validateTokenAndAdmin, getUsers);

export default router