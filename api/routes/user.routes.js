import express from "express";
import { test, updateUser, signout } from "../controllers/user.controler.js";
import { verifyUser } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controler.js";
import { getUsers, getUser } from "../controllers/user.controler.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifyUser, getUsers);
router.get("/:userId", getUser);

export default router;
