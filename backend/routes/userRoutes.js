import express from "express";
import { ROUTES } from "../constants/index.js";
import { getDetails, createUser } from "../controllers/index.js";
import { legacyRequireAuth } from "../middlewares/index.js";

export const router = express.Router();

router.route(ROUTES.USER.root).get(legacyRequireAuth, getDetails);
router.route(ROUTES.USER.login).post(createUser);
