import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controllers.js";
import { getposts } from "../controllers/post.controllers.js";
import { deletepost } from "../controllers/post.controllers.js";
import { updatepost } from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletepost);
router.put("/updatepost/:postId/:userId", verifyUser, updatepost);

export default router;
