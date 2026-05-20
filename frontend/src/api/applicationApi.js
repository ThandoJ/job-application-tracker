import axios from "axios";

const API =
  "http://localhost:5000/api/applications";

// GET APPLICATIONS
export const fetchApplications =
  async () => {

    const response =
      await axios.get(API);

    return response.data;
  };

// CREATE APPLICATION
export const createApplication =
  async (applicationData) => {

    const response =
      await axios.post(
        API,
        applicationData
      );

    return response.data;
  };

// UPDATE STATUS
export const updateApplicationStatus =
  async (id, updatedData) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        updatedData
      );

    return response.data;
  };

  export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};