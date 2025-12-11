import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { extractTextFromBase64 } from "../visionOCR/visionOCR";
import { useNavigate } from "react-router-dom";
import { TbCameraSearch } from "react-icons/tb";

// ⭐ Utility function used by Navbar
export const triggerCamera = (ref, callback) => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Camera not supported on this device!");
    return;
  }

  ref.current.click();
  ref.current.onchange = (e) => {
    if (e.target.files[0]) callback(e.target.files[0]);
  };
};

const CameraAccess = ({ onResult }) => {
  const [showCropper, setShowCropper] = useState(false);
  const [rawFile, setRawFile] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const cameraInputRef = useRef(null);
  const navigate = useNavigate();

  // When Navbar triggers camera → we receive file here
  const startImageCapture = (file) => {
    setRawFile(file);
    setShowCropper(true);
  };

  // Load preview
  useEffect(() => {
    if (!rawFile) return;
    const url = URL.createObjectURL(rawFile);
    setRawImage(url);
  }, [rawFile]);

  // ⭐ Cropper Variables
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);

  // ⭐ Convert cropped area to Base64
  const generateCroppedImage = async () => {
    const img = new Image();
    img.src = rawImage;
    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      croppedPixels.x,
      croppedPixels.y,
      croppedPixels.width,
      croppedPixels.height,
      0,
      0,
      croppedPixels.width,
      croppedPixels.height
    );

    return canvas.toDataURL("image/png");
  };

  // ⭐ When user clicks Done (Crop)
  const handleCropDone = async () => {
    if (!croppedPixels) return;

    setShowCropper(false);
    setLoading(true);

    const base64 = await generateCroppedImage();
    const text = await extractTextFromBase64(base64);

    setLoading(false);

    if (onResult) onResult(text); // send result back to Navbar

    if (text.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(text)}`);
    }
  };

  return (
    <>
      {/* Hidden file input for camera */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => startImageCapture(e.target.files[0])}
      />

      {/* Optional: button to open camera (if you want to use CameraAccess directly somewhere) */}
      <button
        onClick={() => triggerCamera(cameraInputRef, startImageCapture)}
        className="text-2xl text-rose-500"
      >
        <TbCameraSearch />
      </button>

      {/* ⭐ Cropper Modal */}
      {showCropper && rawImage && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 shadow-xl relative">
            <div className="w-[90vw] max-w-[350px] h-[350px] relative">
              <Cropper
                image={rawImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(area, pixels) => setCroppedPixels(pixels)}
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCropDone}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex justify-center items-center">
          <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col items-center gap-2">
            <p className="text-gray-800">Processing image...</p>
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CameraAccess;
