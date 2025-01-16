import { Router } from "express";
import getController from "./controllers/get.js";
import postController from "./controllers/post.js";
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
import verifyToken from "../../middleware/index.js"

const router = Router();

router.post("/add", postController)
router.get("/get", getController)
router.patch("/update/:id", verifyToken, updateController)
router.delete("/delete/:id", verifyToken, deleteController)

export default router;