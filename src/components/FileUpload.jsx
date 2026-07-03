import { useState } from 'react';
import { FaFileArrowUp } from 'react-icons/fa6';

const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const maxSize = 5 * 1024 * 1024;

export default function FileUpload({ onChange, error: fieldError }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    const invalid = selected.find((file) => !allowedTypes.includes(file.type) || file.size > maxSize);
    if (invalid) {
      setError('Upload PDF, JPG, or PNG files under 5 MB each.');
      return;
    }
    setError('');
    setFiles(selected.map((file) => ({ name: file.name, progress: 100 })));
    onChange?.(selected);
  };

  return (
    <div>
      <label className="upload-zone">
        <FaFileArrowUp />
        <span>Choose documents</span>
        <input className="visually-hidden" type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFiles} />
      </label>
      {(error || fieldError) && <div className="text-danger small mt-2">{error || fieldError.message}</div>}
      <div className="vstack gap-2 mt-3">
        {files.map((file) => (
          <div className="upload-progress" key={file.name}>
            <div className="d-flex justify-content-between small"><span>{file.name}</span><span>{file.progress}%</span></div>
            <div className="progress"><div className="progress-bar" style={{ width: `${file.progress}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
