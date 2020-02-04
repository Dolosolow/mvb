import { Router } from "express";
import * as authController from "@src/controllers/api/auth.controller";
import * as siteController from "@src/controllers/site.controller";

const router = Router();

router.get("/dining", siteController.getDining);

router.get("/events", siteController.getEvents);

router.get("/membership", siteController.getMemberships);

router.get("/membership/gold", authController.getGoldSignup);

router.get("/membership/silver", authController.getSilverSignup);

router.get("/location", siteController.getLocations);

router.get("/movies/:id", siteController.getMovieSeats);

router.get("/", siteController.getIndex);

router.get("/checkout", siteController.getCheckout);
router.post("/checkout", siteController.postCheckout);

export default router;
