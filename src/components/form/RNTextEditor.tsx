// CustomEditor.tsx
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import React Quill to prevent SSR issues
const ReactQuill = dynamic(
  () => import("react-quill") as Promise<{ default: React.ComponentType<any> }>,
  { ssr: false }
);

// Editor toolbar options with additional features
const modules = {
  toolbar: [
    [{ bold: true }, { italic: true }, { underline: true }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ list: "check" }],
  ],
};

interface CustomEditorProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RNTextEditor = ({ label, name, value, onChange }: CustomEditorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-default-600">{label}</label>
      <ReactQuill
        className="text-lg h-[calc(100vh-500px)] border border-default-200 rounded-md p-2 focus:outline-none"
        modules={modules}
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default RNTextEditor;
