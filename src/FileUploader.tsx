import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop files here, or click to select files</p>
    </div>
  );
};

export default FileUploader;
