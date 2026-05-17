import axios from "axios";

const API =
  "http://localhost:5000/api/jobs";

// GET ALL JOBS
export const getJobs = async () => {
  const response = await axios.get(API);

  return response.data;
};

// CREATE JOB
export const createJob = async (
  jobData,
  token
) => {

  const response = await axios.post(
    API,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// DELETE JOB
export const deleteJob = async (
  id,
  token
) => {

  const response = await axios.delete(
    `${API}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// UPDATE JOB
export const updateJob = async (
  id,
  updatedData,
  token
) => {

  const response = await axios.put(
    `${API}/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};