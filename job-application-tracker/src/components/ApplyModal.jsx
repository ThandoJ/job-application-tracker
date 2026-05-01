import { useState } from "react";

export default function ApplyModal({ isOpen, onClose, onSubmit, job }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    cv: null,
    cvBase64: ""
  });

  if (!isOpen) return null;

  // CONVERT FILE TO BASE64
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm({
          ...form,
          cv: file.name,
          cvBase64: reader.result // STORE BASE64
        });
      };

      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.phone || !form.cv) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(form);
   
     setForm({
      name: "",
      surname: "",
      phone: "",
      cv: null,
      cvBase64: ""
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Apply for {job.title}
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Surname"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, surname: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        {/*  CV Upload */}
        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, cv: e.target.files[0] })
          }
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}