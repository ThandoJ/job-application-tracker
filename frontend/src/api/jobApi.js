
import axios from "axios";

const API = "https://job-application-tracker-3-nrlr.onrender.com/api/jobs";

// GET JOBS
export const getJobs = async () => {
  const response = await axios.get(API);
  return response.data;
};

// CREATE JOB
export const createJob = async (jobData) => {
  const response = await axios.post(
    API,
    jobData
  );

  return response.data;
};

// DELETE JOB
export const deleteJob = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};

// EDIT JOB
export const editJob = async (
  id,
  updatedData
) => {

  console.log("EDIT DATA:", updatedData);

  const response = await axios.put(
    `${API}/${id}`,
    updatedData
  );

  return response.data;
};

