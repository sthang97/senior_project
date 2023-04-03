import React, { useState, useEffect } from 'react';
import { API } from "aws-amplify";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await API.put("teamtitanapi", "/getImages", {});
        console.log(response);
        setImages(response.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <h1>Thermal Images</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <table>
            <tbody>
              {images.map(({ key, base64 }) => (
                <tr key={key}>
                  <td>
                    <p style={{ cursor: 'pointer' }} onClick={() => selectImage({ key, base64 })}>
                      {key}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginLeft: '20px',
            width: '700px',
            height: '600px',
            border: '1px solid black',
            overflow: 'hidden',
          }}
        >
          {selectedImage && (
            <img
              src={`data:image/png;base64,${selectedImage.base64}`}
              alt={selectedImage.key}
              style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
