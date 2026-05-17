import axios from "axios";

const API =
  "http://localhost:5000/api/applications";

// GET APPLICATIONS
export const getApplications = async (
  token
) => {

  const response = await axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// APPLY FOR JOB
export const applyForJob = async (
  applicationData,
  token
) => {

  const response = await axios.post(
    API,
    applicationData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// UPDATE STATUS
export const updateApplicationStatus =
  async (
    id,
    status,
    token
  ) => {

    const response = await axios.put(
      `${API}/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  };

// GET INTERVIEWS
export const getInterviews =
  async (token) => {

    const response = await axios.get(
      `${API}/interviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  };