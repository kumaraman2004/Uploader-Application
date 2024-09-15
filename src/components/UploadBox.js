import React, { useRef } from 'react';

const UploadBox = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    onFileUpload(file); // Call the upload handler from props
  };

  // Trigger file input click when the box is clicked
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="p-4 text-center cursor-pointer border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition mb-4"
      onClick={handleClick}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        // Calls handleFileSelect when a file is chosen
        onChange={handleFileSelect} 
      />
      <i className="fas fa-cloud-upload-alt text-2xl mb-2 text-purple-700"></i>
      <p className="text-purple-700 font-semibold">Click to upload or drag and drop</p>
      <p className="text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </div>
  );
};

export default UploadBox;
