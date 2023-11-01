import { useEffect, useState } from "preact/hooks";
import { Card, FileInput, UploadButton } from "./components";
import "./app.css";
import {
  TreeDirectory,
  TreeNode,
} from "./components/TreeDirectory/TreeDirectory";

export function App() {
  const [file, setFile] = useState<File | null>(null);

  const [pfp, setPfp] = useState<File | null>(null);

  const [directory, setDirectory] = useState<TreeNode>({
    path: "",
    children: [],
  });

  useEffect(() => {
    const fetchDirectory = async () => {
      const response = await fetch("http://localhost:8000/root", {
        method: "GET",
      });

      const data = await response.json();

      setDirectory(data);
    };

    fetchDirectory();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
      body: formData,
    });

    setPfp(file);

    return response.json();
  };

  return (
    <>
      <div className="main">
        <h1>Secure your pfp upload 😎</h1>
        <Card file={pfp} />
        <div className="inputs">
          <FileInput setFile={setFile} />
          <UploadButton handleUpload={handleUpload} />
        </div>
        <TreeDirectory node={directory} index={0} />
      </div>
    </>
  );
}
