import "./UploadButton.css";

export const UploadButton = ({
  handleUpload,
}: {
  handleUpload: () => Promise<any>;
}) => {
  return (
    <button type="button" class="button" onClick={handleUpload}>
      <div class="button-top">Upload</div>
      <div class="button-bottom"></div>
      <div class="button-base"></div>
    </button>
  );
};
