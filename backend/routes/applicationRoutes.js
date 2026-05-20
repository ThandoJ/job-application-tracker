import express from "express";

import {
  getApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication
} from "../controllers/applicationController.js";

const router = express.Router();

router.get("/", getApplications);

router.post("/", createApplication);

router.put("/:id", updateApplicationStatus);

router.delete("/:id", deleteApplication);

export default router;