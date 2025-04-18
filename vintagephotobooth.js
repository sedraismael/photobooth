import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

export default function VintagePhotoBooth() {
  const [stripColor, setStripColor] = useState("#000000");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("none");
  const photoRef = useRef();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const imgUrls = files.map((file) => URL.createObjectURL(file));
    setImages(imgUrls);
  };

  const handleDownload = async () => {
    if (photoRef.current) {
      const canvas = await html2canvas(photoRef.current);
      const link = document.createElement("a");
      link.download = "photobooth-strip.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-center">Vintage Photobooth</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2">
          <span>Strip Color</span>
          <input
            type="color"
            value={stripColor}
            onChange={(e) => setStripColor(e.target.value)}
            className="w-10 h-10 border rounded-full cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Upload Photos</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="p-2 border rounded"
          />
        </label>

        <label className="flex items-center gap-2">
          <span>Filter</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="none">None</option>
            <option value="grayscale(1)">Grayscale</option>
            <option value="sepia(1)">Sepia</option>
            <option value="contrast(1.5)">Contrast</option>
            <option value="brightness(1.2)">Bright</option>
            <option value="saturate(2)">Saturated</option>
          </select>
        </label>

        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-gray-800"
        >
          Download Strip
        </button>
      </div>

      <textarea
        placeholder="Add a vintage description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full max-w-lg h-24 p-3 border rounded resize-none"
      />

      <div className="text-lg font-medium text-gray-600">Date: {date}</div>

      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-lg p-4 rounded-xl"
          style={{ borderLeft: `20px solid ${stripColor}` }}
          ref={photoRef}
        >
          <div className="flex flex-col gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Photo ${index + 1}`}
                style={{ filter }}
                className="w-64 rounded shadow-md"
              />
            ))}
          </div>
          <div className="mt-4 text-sm italic text-gray-700">{description}</div>
        </motion.div>
      )}
    </div>
  );
}
