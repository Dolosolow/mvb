import { Router } from "express";
import * as siteController from "@src/controllers/site.controller";

const router = Router();

router.get("/dining", siteController.getDining);

router.get("/events", siteController.getEvents);

router.get("/membership", siteController.getMemberships);

router.get("/membership/gold", siteController.getGoldSignup);

router.get("/membership/silver", siteController.getSilverSignup);

router.get("/location", siteController.getLocations);

router.get("/movies/:id", siteController.getMovieSeats);

router.get("/", siteController.getIndex);

router.get("/reset", siteController.getResetPwd);

router.get("/checkout", siteController.getCheckout);
router.post("/checkout", siteController.postCheckout);

export default router;
