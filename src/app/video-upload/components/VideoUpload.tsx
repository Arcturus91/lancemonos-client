import React, { useState, ChangeEvent, FormEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface VideoUploadProps {
  getVideoUploadKey: (videoKey: string) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ getVideoUploadKey }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const fileNamePattern = /^[0-9a-zA-Z._-]+$/;

    if (selectedFile?.name && !fileNamePattern.test(selectedFile?.name)) {
      alert("El nombre no es correcto");
      return;
    }
    if (selectedFile) {
      setFile(selectedFile);
      getVideoUploadKey(selectedFile.name);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }
      );

      if (!response.ok) throw new Error("Failed to get pre-signed URL");

      const { url, fields } = await response.json();
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        alert(
          "Subida de video completada\nRevisa las palabras principales de tu video en al menos 5 minutos\nSi sale un error, prueba luego de 5 minutos más.\nSino, contáctame"
        );
      } else {
        throw new Error("S3 Upload Error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("La subida ha fallado. Por favor, intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Sube tu video a AWS
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-black border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <CloudUploadIcon
                fontSize="large"
                className="w-8 h-8 mb-4 text-black"
              />

              <p className="mb-2 text-sm text-black">
                <span className="font-semibold">Haz clic para subir</span> o
                arrastra y suelta
              </p>
              <p className="text-xs text-black">
                Archivos soportados: .mov o .mp4
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="video/mp4,video/mov"
            />
          </label>
        </div>
        {file && (
          <p className="text-sm text-black">
            Archivo seleccionado: {file.name}
          </p>
        )}
        {uploading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        )}
        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-white hover:text-black border border-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Subiendo..." : "Subir"}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
