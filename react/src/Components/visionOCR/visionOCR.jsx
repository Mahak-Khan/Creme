  import Tesseract from "tesseract.js";

  // Named export for OCR
  export const extractTextFromBase64 = async (imageBase64) => {
    const { data } = await Tesseract.recognize(imageBase64, "eng", {
      logger: (m) => console.log(m),
      tessedit_pageseg_mode: "7",
    });
    return data.text.trim();
  };

  // Keep VisionOCR component if needed
  const VisionOCR = () => null;
  export default VisionOCR;
