export default function CVPreviewModal({ isOpen, onClose, cvBase64, fileName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      
      <div className="bg-white w-[90%] md:w-[70%] h-[80%] rounded-xl shadow-lg flex flex-col">
        
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">{fileName || "CV Preview"}</h2>
          <button onClick={onClose} className="text-red-500">Close</button>
        </div>

        {/* PDF VIEW */}
        <div className="flex-1">
          {cvBase64 ? (
            <iframe
              src={cvBase64}
              title="CV Preview"
              className="w-full h-full rounded-b-xl"
            />
          ) : (
            <p className="p-4 text-red-500">No CV available</p>
          )}
        </div>

      </div>
    </div>
  );
}