import React, { useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";

export const UploadImage = ({ contractInstance, account }) => {
  const [files, setFiles] = useState(Array(4).fill(null));
  const [fileURLs, setFileURLs] = useState(Array(4).fill(""));
  const [licensePlate, setLicensePlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadImage = async (index) => {
    const formData = new FormData();
    formData.append("file", files[index]);

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
    setFileURLs((prevURLs) => {
      const newURLs = [...prevURLs];
      newURLs[index] = url;
      return newURLs;
    });
  };

  const handleFileChange = (e, index) => {
    const newFile = e.target.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = newFile;
      return newFiles;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //comprueba que todas las fileURLs esten llenas
    if (fileURLs.some((url) => url === "")) {
      setError("Por favor, sube todas las imagenes");
    } else {
      console.log("fileURLs: ", fileURLs);
      console.log("licensePlate: ", licensePlate);
      try {
        const tx = await contractInstance.setPhotosOfCar(
          licensePlate,
          fileURLs[0],
          fileURLs[1],
          fileURLs[2],
          fileURLs[3],
        );

        setLoading(true);
        await tx.wait();
        setLoading(false);

        window.location.reload();

        console.log("Transaction: ", tx);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="licensePlate">Matricula:</label>
        <input
          type="text"
          id="licensePlate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        {files.map((_, index) => (
          <div key={index}>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)}
            />
            <button onClick={() => uploadImage(index)}>Subir</button>
            {fileURLs[index] && (
              <div>
                <p>Imagen subida exitosamente:</p>
                <img
                  src={fileURLs[index]}
                  alt={`Imagen subida ${index + 1}`}
                  style={{ width: "50%" }}
                />
                <p>
                  URL:{" "}
                  <a
                    href={fileURLs[index]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {fileURLs[index]}
                  </a>
                </p>
              </div>
            )}
          </div>
        ))}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading
            ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  variant="light" // add this line to set the color of the spinner to white
                />{" "}
                &nbsp; Actualizando imagenes...
              </>
            )
            : (
              "actualizar imagenes"
            )}
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default UploadImage;
