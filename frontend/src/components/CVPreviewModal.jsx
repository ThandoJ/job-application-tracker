export default function CVPreviewModal({
  isOpen,
  onClose,
  cvBase64,
  fileName
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] overflow-hidden shadow-2xl animate-fadeIn">

        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-bold text-xl">
            {fileName || "CV Preview"}
          </h2>

          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

        <iframe
          src={cvBase64}
          title="CV Preview"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}