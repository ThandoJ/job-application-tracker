import supabase from "../supabase.js";

export const getApplications = async (
  req,
  res
) => {
  try {

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("appliedAt", {
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

export const createApplication = async (
  req,
  res
) => {
  try {

    const { data, error } = await supabase
      .from("applications")
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

export const updateApplicationStatus =
  async (req, res) => {
    try {

      const { id } = req.params;

      const { status } = req.body;

      const { data, error } = await supabase
        .from("applications")
        .update({ status })
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