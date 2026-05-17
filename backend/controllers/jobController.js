import supabase from "../config/supabase.js";

export const getJobs = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("createdAt", {
        ascending: false
      });

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createJob = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("jobs")
      .insert([req.body])
      .select();

    if (error) {
      return res.status(500).json(error);
    }

    res.status(201).json(data[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      message: "Job deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const editJob = async (req, res) => {
  try {

    const { id } = req.params;

    const { data, error } = await supabase
      .from("jobs")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};