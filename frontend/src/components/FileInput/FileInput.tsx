import "./FileInput.css";

export const FileInput = ({
  setFile,
}: {
  setFile: (file: File | null) => void;
}) => {
  return (
    <input
      type="file"
      name="file"
      onChange={(e) => {
        const file = (e.target as HTMLInputElement)?.files?.[0] ?? null;
        console.log("input file : ", file);
        setFile(file);
      }}
    />
  );
};
