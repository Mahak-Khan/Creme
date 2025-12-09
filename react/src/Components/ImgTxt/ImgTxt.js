import Tesseract from "tesseract.js";

const preprocessImage = (img) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Convert to grayscale
  for (let i = 0; i < data.length; i += 4) {
    const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  const threshold = 150;
  for (let i = 0; i < data.length; i += 4) {
    const val = data[i] > threshold ? 255 : 0;
    data[i] = data[i + 1] = data[i + 2] = val;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};


export const extractHandwrittenText = async (file) => {
  if (!file) return "";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      try {
        const preprocessedImage = preprocessImage(img);

        const { data } = await Tesseract.recognize(preprocessedImage, "eng_best", {
          logger: (m) => console.log(m),
          tessedit_char_whitelist:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?- "
        });

        resolve(data.text.trim());
      } catch (err) {
        console.error("OCR Error:", err);
        resolve("");
      }
    };

    img.onerror = (err) => {
      console.error("Image failed to load:", err);
      reject(err);
    };
  });
};
