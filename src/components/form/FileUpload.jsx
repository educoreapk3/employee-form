import { useState, useEffect } from "react";
import ShapeImg from "../../assets/shape.png";

const FileUpload = ({
  label,
  name,
  setValue,
  error,
  watch,
  accept = "image/*,.pdf",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const fileValue = watch ? watch(name) : null;

  useEffect(() => {
    if (!fileValue) {
      setFileName("");
      setPreview(null);
    } else if (typeof fileValue === "string") {
      setPreview(fileValue);
      setFileName(fileValue.split("/").pop());
    }
  }, [fileValue]);

  // DRAG EVENTS
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setValue(name, file, { shouldValidate: true });
    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // CLICK UPLOAD
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(name, file, { shouldValidate: true });
    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(name, null, { shouldValidate: true });
    setFileName("");
    setPreview(null);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-base text-black">
        {label}
      </label>

      <label
        htmlFor={name}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border border-dashed rounded-md p-4
          flex flex-col items-center justify-center
          text-center cursor-pointer transition
          bg-[#FAFAFA]
          ${isDragging ? "border-green-500 bg-green-50" : "border-gray-400"}
        `}
      >
        {fileName && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
            title="Clear file"
          >
            &times;
          </button>
        )}
        <img src={ShapeImg} alt="upload" className="w-12 h-12 mb-3" />

        {preview ? (
          <>
            {fileName.includes(".pdf") ?
              'PDF'
              :
              <img
                src={preview}
                alt="preview"
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
            }
          </>
        ) : fileName ? (
          <p className="text-sm text-green-600 font-medium">
            {fileName}
          </p>
        ) : (
          <>
            <p className="text-sm text-black opacity-70 font-medium">
              Drag & Drop upload file
            </p>

            <p className="text-sm text-[#D3323F] opacity-70 font-medium">
              (Only Image or PDF)
            </p>

            <span className="text-sm text-black opacity-70 my-2">
              OR
            </span>

            <span className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold">
              Select a file
            </span>
          </>
        )}

        {/* REAL FILE INPUT */}
        <input
          id={name}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {error && (
        <span className="text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
