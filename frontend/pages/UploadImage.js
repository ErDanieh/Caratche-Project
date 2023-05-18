import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Spinner } from "react-bootstrap";

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
    setLoading(true);
    try {
      // Crear un array de promesas para cada imagen a subir
      const uploadPromises = files.map((file, index) => {
        if (!file) {
          throw new Error(`Por favor, sube todas las imagenes`);
        }
        // Devuelve la promesa sin esperar a que se resuelva
        return uploadImage(index);
      });

      // Espera a que todas las promesas se resuelvan antes de continuar
      await Promise.all(uploadPromises);

      const tx = await contractInstance.setPhotosOfCar(
        licensePlate,
        fileURLs[0],
        fileURLs[1],
        fileURLs[2],
        fileURLs[3],
      );

      await tx.wait();
      setLoading(false);
      window.location.reload();

      console.log("Transaction: ", tx);
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
      if (error.message) setError(error.message);
    }
  };

  return (
    <Card
      style={{
        width: "50rem",
        border: "1px solid #ccc",
        borderRadius: "15px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "0 auto",
      }}
    >
      <Card.Body style={{ margin: "20px" }}>
        <Card.Title style={{ textAlign: "center" }}>
          <h2>Update Car Photos</h2>
        </Card.Title>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <label htmlFor="licensePlate">License Plate:</label>
            <p>
              <input
                type="text"
                id="licensePlate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </p>
          </div>
          {files.map((_, index) => (
            
            <div key={index}>
            <p>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
              />
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
            </p>
            </div>
          ))}
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            style={{ marginTop: "7px" }}
          >
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
                  &nbsp; Updating images...
                </>
              )
              : (
                "Update images"
              )}
          </Button>
          {error && <p>{error}</p>}
        </form>
      </Card.Body>
    </Card>
  );
};

export default UploadImage;
