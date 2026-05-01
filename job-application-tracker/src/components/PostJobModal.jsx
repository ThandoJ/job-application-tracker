import { useState } from "react";

export default function PostJobModal({ isOpen, onClose, onAddJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      description,
      createdAt: new Date().toISOString()
    };

    onAddJob(newJob);
    onClose();

    // reset form
    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Modal */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Post New Job</h2>

        <input
          placeholder="Job Title"
          className="w-full mb-3 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Company"
          className="w-full mb-3 p-2 border rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Location"
          className="w-full mb-3 p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}