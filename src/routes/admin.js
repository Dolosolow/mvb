import { Router } from "express";
import * as moviesController from "@src/controllers/api/movies.controller";
import * as siteController from "@src/controllers/site.controller";

const router = Router();

router.post("/add-movie", moviesController.postMovie);

router.get("/", siteController.getAdminDash);

export default router;
