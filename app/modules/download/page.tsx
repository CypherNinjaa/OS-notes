import React, { useRef } from "react";
import Link from "next/link";

const modules = [
  { id: 1, name: "Module 1" },
  { id: 2, name: "Module 2" },
  { id: 3, name: "Module 3" },
  { id: 4, name: "Module 4" },
  { id: 5, name: "Module 5" },
  { id: 6, name: "Module 6" },
];

function downloadModuleAsHtml(id: number) {
  // Create a hidden iframe to load the module page
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = `/modules/${id}`;
  document.body.appendChild(iframe);

  iframe.onload = () => {
    // Try to get the main content (container)
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      // You may want to adjust this selector to match your layout
      const container = doc.querySelector(".container");
      const html = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset='utf-8'>\n<title>Module ${id}</title>\n</head>\n<body>${container ? container.outerHTML : doc.body.innerHTML}</body>\n</html>`;
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `module-${id}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    document.body.removeChild(iframe);
  };
}

const DownloadModulesPage = () => {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Download Modules</h1>
      <ul className="space-y-4">
        {modules.map((module) => (
          <li key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
            <span>{module.name}</span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => downloadModuleAsHtml(module.id)}
            >
              Download as HTML
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/modules">
          <span className="text-blue-600 hover:underline">Back to Modules</span>
        </Link>
      </div>
    </div>
  );
};

export default DownloadModulesPage;
