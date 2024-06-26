import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  deleteComment,
  getcomments,
} from "../controllers/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/getPostComments/:postId", verifyUser, getPostComments);
router.put("/likeComment/:commentId", verifyUser, likeComment);
router.delete("/deleteComment/:commentId", verifyUser, deleteComment);
router.get("/getcomments", verifyUser, getcomments);

export default router;
