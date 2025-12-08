import Tesseract from "tesseract.js";

const preprocessAndGetLineImages = async (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const mat = cv.imread(img);
      cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);

      // ⭐ Adaptive threshold helps on notebooks & shadows
      cv.adaptiveThreshold(
        mat,
        mat,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY_INV,
        25,
        10
      );

      // ⭐ Connect letters into lines
      const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(30, 3));
      cv.dilate(mat, mat, kernel);

      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      let lineImages = [];

      for (let i = 0; i < contours.size(); i++) {
        const rect = cv.boundingRect(contours.get(i));
        if (rect.width > 50 && rect.height > 10) {  // filter noise
          const line = cv.imread(img)
            .roi(rect); // crop region
          lineImages.push({ img: line, y: rect.y });
        }
      }

      // Sort by vertical position (reading order)
      lineImages.sort((a, b) => a.y - b.y);

      resolve(lineImages);
    };
  });
};

const tesseractOCR = async (mat) => {
  const dataURL = cv.imencode(".png", mat).toString("base64");
  const imgSrc = `data:image/png;base64,${dataURL}`;

  try {
    const { data } = await Tesseract.recognize(imgSrc, "eng", {
      logger: () => {},
    });
    return data.text.trim();
  } catch {
    return "";
  }
};

export const extractTextFromImage = async (file) => {
  if (!file) return "";

  const lineImages = await preprocessAndGetLineImages(file);

  let finalText = "";

  for (const line of lineImages) {
    const text = await tesseractOCR(line.img);
    if (text) finalText += text + "\n";
  }

  return finalText.trim();
};
