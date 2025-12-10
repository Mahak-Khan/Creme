import Tesseract from "tesseract.js";

export const extractTextFromImage = async (file) => {
  if (!file) return "";

  return new Promise((resolve) => {
    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m), // progress in console
    })
      .then(({ data }) => {
        const finalText = data.text.trim();
        resolve(finalText);
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        resolve("");
      });
  });
};
  