import React, { useState } from "react";
import axios from "axios";

export const UploadImage = () => {
  const [file, setFile] = useState();
  const [fileURL, setFileURL] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      },
    );

    const url = `https://ipfs.io/ipfs/${result.data.IpfsHash}`;
    setFileURL(url);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Subir</button>
      {fileURL && (
        <div>
          <p>Imagen subida exitosamente:</p>
          <img src={fileURL} alt="Imagen subida" style={{ width: "50%" }} />
          <p>
            URL:{" "}
            <a href={fileURL} target="_blank" rel="noreferrer">{fileURL}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
