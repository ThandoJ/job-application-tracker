import express from "express";

import {
  getJobs,
  createJob,
  deleteJob,
  editJob
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);

router.post("/", createJob);

router.delete("/:id", deleteJob);

router.put("/:id", editJob);

export default router;