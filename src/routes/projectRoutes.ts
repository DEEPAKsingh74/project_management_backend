import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectControllers";

const router = Router();

router.get("/", getProjects).post("/", createProject)

export default router;