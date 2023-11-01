import { useEffect, useState } from "preact/hooks";
import "./Card.css";

export const Card = ({ file }: { file: File | null }) => {
  const [filename, setFilename] = useState<string>("");
  const [fileDL, setFileDL] = useState<string | null>(null);

  const fetchFile = async (filename: string) => {
    const response = await fetch(`http://localhost:8000/get-file/${filename}`, {
      method: "GET",
    });

    return response.blob();
  };

  useEffect(() => {
    if (file !== null) {
      fetchFile(file.name).then((blob) => {
        setFileDL(URL.createObjectURL(blob));
      });
    }
  }, [file]);

  return (
    <>
      <div className="get-file">
        <input
          type="text"
          placeholder="filename"
          value={filename}
          onChange={(e) => {
            setFilename((e.target as HTMLInputElement)?.value);
          }}
        />
        <button
          onClick={() => {
            fetchFile(filename).then((blob) => {
              setFileDL(URL.createObjectURL(blob));
            });
          }}
        >
          Fetch
        </button>
      </div>
      <div class="card">
        <img
          src={fileDL ?? "assets/user.png"}
          alt="profile-picture"
          className="profile-picture"
        />
      </div>
    </>
  );
};
