import express from "express";
import Job from "../models/Job.js";

const router = express.Router();


// GET ALL JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({
      createdAt: -1
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// CREATE JOB
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// DELETE JOB
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// UPDATE JOB
router.put("/:id", async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;