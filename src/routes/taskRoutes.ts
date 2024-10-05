import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskControllers";

const router = Router();

router.get("/", getTasks).post("/", createTask);
router.post("/:taskId/status", updateTaskStatus); 

export default router;