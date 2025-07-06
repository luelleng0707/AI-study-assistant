import React, { useState } from 'react';

export default function UploadBox() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    // TODO: Send to backend
  };

  return (
    <div className="border border-dashed border-gray-400 p-4 rounded mb-4">
      <input type="file" onChange={handleChange} className="mb-2" />
      {file && <p className="text-sm">Selected: {file.name}</p>}
    </div>
  );
}