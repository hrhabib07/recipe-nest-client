// CustomEditor.tsx
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Editor toolbar options
const modules = {
  toolbar: [
    [{ bold: true }, { italic: true }, { underline: true }], // Formatting options
  ],
};

interface CustomEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void; // Callback to handle value changes
}

const RNTextEditor = ({ label, name, value, onChange }: CustomEditorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-default-600">{label}</label>
      {/* React Quill Editor */}
      <ReactQuill
        className="text-lg h-32 border border-default-200 rounded-md p-2 focus:outline-none"
        modules={modules}
        theme="snow" // Use the snow theme
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RNTextEditor;
