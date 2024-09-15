import React from 'react';
import { FaFilePdf, FaFileImage, FaFile, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

const FileItem = ({ type, name, size, progress, file, column, onDelete }) => {
  // Identify file type
  const isImage = ['jpg', 'jpeg', 'png'].includes(type.toLowerCase());
  const isPdf = type.toLowerCase() === 'pdf';
  const isMp4 = type.toLowerCase() === 'mp4';

  // Check if this is one of the last two columns (column3 or column4)
  const isLastTwoColumns = column === 'column3' || column === 'column4';

  // Render the appropriate icon based on file type
  const renderIcon = () => {
    if (isImage) return <FaFileImage className="text-2xl text-blue-600 mr-2" />;
    if (isPdf) return <FaFilePdf className="text-2xl text-red-600 mr-2" />;
    if (isMp4) return <FaFile className="text-2xl text-blue-600 mr-2" />;
    return <FaFile className="text-2xl text-gray-600 mr-2" />;
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded-md mb-2">
      <div className="flex items-center w-full">
        {renderIcon()}
        <div className="flex flex-col w-full">
          {/* File name and size */}
          <div className="flex items-center justify-between w-full">
            <div className="ml-2 w-full">
              <p className="font-semibold">{name}</p>
              <p className="text-gray-500 text-xs">{size}</p>
            </div>

            {/* For columns 3 and 4 (Circular progress bar after file name) */}
            {isLastTwoColumns && (
              <div className="relative w-11 h-11 mr-2"> 
                <svg className="absolute top-0 left-0 w-full h-full rounded-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e5e5"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#4f46e5"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`} 
                    transform="rotate(-90 50 50)" 
                  />
                </svg>
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-xs">
                  {`${progress}%`}
                </p>
              </div>
            )}
          </div>

          {/* For columns 1 and 2 (Linear progress bar below file name) */}
          {!isLastTwoColumns && (
            <div className="mt-2 flex items-center w-full">
              <div className="flex-grow">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-500 text-sm ml-2">{`${progress}%`}</p>
            </div>
          )}
        </div>
      </div>

      {/* Checkmark and delete icon */}
      <div className="flex items-center ml-4 space-x-1">
        {progress === 100 && (
          <FaCheckCircle className="text-green-500 text-xs cursor-pointer" />
        )}
        <FaTrashAlt
          className="text-gray-500 text-xs cursor-pointer hover:text-red-500 transition"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default FileItem;
