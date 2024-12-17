import { Router } from "express";
import userRouter from "./users.route.js"; // Import the user routes

const router = Router();

// Direct "/users" routes to the userRouter
router.use("/users", userRouter);

export default router;
