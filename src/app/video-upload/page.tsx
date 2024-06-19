"use client";

import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Porfavor, selecciona un archivo");
      return;
    }

    setUploading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );

    if (response.ok) {
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
        console.log("upload completed");
        alert("Subida de video completada");
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        alert("Upload failed.");
        //!send alert by mail u otra manera de ver logs
      }
    } else {
      alert("Failed to get pre-signed URL.");
      //!send alert by mail
    }

    setUploading(false);
  };

  return (
    <main className="upload-video">
      <h1>Sube tu video a AWS</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFile(files[0]);
            }
          }}
          accept="image/png, image/jpeg, video/mp4"
        />
        <button type="submit" disabled={uploading}>
          Subir
        </button>
      </form>
    </main>
  );
}
