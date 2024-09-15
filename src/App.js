import React, { useState } from 'react';
import UploadBox from './components/UploadBox';
import FileItem from './components/FileItem';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const [filesByColumn, setFilesByColumn] = useState({
    column1: [],
    column2: [],
    column3: [],
    column4: [],
  });

  const handleFileUpload = (file, column) => {
    const newFile = {
      type: file.name.split('.').pop(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      progress: 0,
      file: file,
      column: column,
    };

    setFilesByColumn((prevFiles) => ({
      ...prevFiles,
      [column]: [...prevFiles[column], newFile],
    }));

    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += 10;
      setFilesByColumn((prevFiles) => ({
        ...prevFiles,
        [column]: prevFiles[column].map((f) =>
          f.name === file.name ? { ...f, progress: uploadProgress } : f
        ),
      }));

      if (uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleDelete = (fileName, column) => {
    setFilesByColumn((prevFiles) => ({
      ...prevFiles,
      [column]: prevFiles[column].filter((file) => file.name !== fileName),
    }));
  };

  return (
    <div className="p-8">
      {/* Outer div with dashed line */}
      <div className="border-dashed border-2 border-gray-400 p-6 rounded-lg">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div>
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column1")} />
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column1")} />
          </div>
          <div>
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column2")} />
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column2")} />
          </div>
          <div>
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column3")} />
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column3")} />
          </div>
          <div>
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column4")} />
            <UploadBox onFileUpload={(file) => handleFileUpload(file, "column4")} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div>
            {filesByColumn.column1.map((file, index) => (
              <FileItem
                key={index}
                type={file.type}
                name={file.name}
                size={file.size}
                progress={file.progress}
                file={file.file}
                column="column1"
                onDelete={() => handleDelete(file.name, "column1")}
              />
            ))}
          </div>
          <div>
            {filesByColumn.column2.map((file, index) => (
              <FileItem
                key={index}
                type={file.type}
                name={file.name}
                size={file.size}
                progress={file.progress}
                file={file.file}
                column="column2"
                onDelete={() => handleDelete(file.name, "column2")}
              />
            ))}
          </div>
          <div>
            {filesByColumn.column3.map((file, index) => (
              <FileItem
                key={index}
                type={file.type}
                name={file.name}
                size={file.size}
                progress={file.progress}
                file={file.file}
                column="column3"
                onDelete={() => handleDelete(file.name, "column3")}
              />
            ))}
          </div>
          <div>
            {filesByColumn.column4.map((file, index) => (
              <FileItem
                key={index}
                type={file.type}
                name={file.name}
                size={file.size}
                progress={file.progress}
                file={file.file}
                column="column4"
                onDelete={() => handleDelete(file.name, "column4")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
