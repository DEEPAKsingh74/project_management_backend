import { Router } from "express";
import { getSearch } from "../controllers/searchControllers";

const router = Router();

router.get("/", getSearch);

export default router;