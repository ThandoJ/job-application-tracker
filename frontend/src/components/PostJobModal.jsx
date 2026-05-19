import { useState } from "react";

export default function PostJobModal({
  isOpen,
  onClose,
  onAddJob
}) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      description,
      interviewLocation,
      createdAt: new Date().toISOString()
    };

    onAddJob(newJob);

    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl text-black w-full max-w-lg p-6 animate-fadeIn shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Post New Job
        </h2>

        <div className="space-y-4">

          <input
            placeholder="Job title"
            className="w-full p-3 border rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Company"
            className="w-full p-3 border rounded-xl"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            placeholder="Location"
            className="w-full p-3 border rounded-xl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Interview Location"
            className="w-full p-3 border rounded-xl"
            value={interviewLocation}
            onChange={(e) =>
              setInterviewLocation(
                e.target.value
              )
            }
          />

          <textarea
            placeholder="Description"
            rows={4}
            className="w-full p-3 border rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-200"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white"
            >
              Post Job
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}