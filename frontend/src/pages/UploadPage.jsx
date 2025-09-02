import React, { useState } from "react";
import { uploadImage } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import Loader from "../components/Loader";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ErrorBanner from "../components/ErrorBanner";

export default function UploadPage() {
  
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const maskedURL = await uploadImage(file);
      setResult(maskedURL);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Header />
      <div className="flex-grow container mx-auto py-16 px-4 text-start mt-12">
         <div className="mb-12">
          <div className="text-3xl font-semibold mb-2  ">
             Protect Sensitive Information with
            <span className="gradient-title ml-4">PII Masking</span>
          </div>
         <span className="text-lg text-gray-600 flex ">
            Upload an image to get desired privacy protection ✨ 
          </span>
        </div>
        <div className="flex justify-center ">
          <ImageUploader
            onFileSelect={(selectedFile) => {
              setFile(selectedFile);
              setResult(null);
              setError("");
            }}
          />
        </div>

        <div className="mt-6 flex flex-col items-center">

          <button
            className="mt-6 bg-blue-600 tracking-wider text-lg text-white px-6 py-3 rounded-xl disabled:opacity-50 flex items-center justify-center hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
            disabled={!file || loading}
          >
            {result ? "Resulted Image" : "Get Started"}
          </button>
        </div>

        {loading && <Loader />}

        {error && <ErrorBanner message={error} />}

        {result && (
          <div className="mt-12 h-full flex flex-col items-center">
            <BeforeAfterSlider
              beforeSrc={file ? URL.createObjectURL(file) : ""}
              afterSrc={result}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
