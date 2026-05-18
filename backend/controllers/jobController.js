
import supabase from "../config/supabase.js";

// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("createdAt", {
        ascending: false
      });

    if (error) {
      console.log(error);

      return res.status(500).json({
        message: error.message
      });
    }

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE JOB
export const createJob = async (req, res) => {
  try {

    console.log("Creating job:", req.body);

    const { data, error } = await supabase
      .from("jobs")
      .insert([
        {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          description: req.body.description,
          createdAt: new Date().toISOString()
        }
      ])
      .select();

    if (error) {

      console.log(error);

      return res.status(500).json({
        message: error.message
      });
    }

    res.status(201).json(data[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {

      console.log(error);

      return res.status(500).json({
        message: error.message
      });
    }

    res.json({
      message: "Job deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// EDIT JOB
export const editJob = async (req, res) => {
  try {

    const { id } = req.params;

    const { data, error } = await supabase
      .from("jobs")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) {

      console.log(error);

      return res.status(500).json({
        message: error.message
      });
    }

    res.json(data[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

