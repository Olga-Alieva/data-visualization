import { memo, useRef } from 'react';
import Button from '@mui/material/Button';

type FileInputProps = {
  onFileUpload: (file: File) => void;
  disabled: boolean;
};

export const FileInput = memo(({ onFileUpload, disabled }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <label htmlFor="upload">
      <input ref={inputRef} style={{ display: 'none' }} type="file" accept=".csv" onChange={handleFileUpload} />

      <Button
        disabled={disabled}
        color="primary"
        variant="contained"
        component="span"
        onClick={() => inputRef.current?.click()}
      >
        Upload file
      </Button>
    </label>
  );
});
