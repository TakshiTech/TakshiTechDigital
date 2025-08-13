import { NextRequest, NextResponse } from "next/server";

// Use Edge runtime for the API route
export const config = {
  runtime: "edge", // Enable Edge runtime
};

const handler = async (req: NextRequest) => {
  console.log("Received request method:", req.method);  // Log the request method for debugging

  // Ensure only POST requests are allowed
  if (req.method === "POST") {
    try {
      const formData = await req.formData();
      const file = formData.get("cv");

      if (!(file instanceof File)) {
        return new NextResponse(JSON.stringify({ error: "Invalid file format" }), { status: 400 });
      }

      if (!file) {
        return new NextResponse(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
      }

      if (!file.type.includes("pdf")) {
        return new NextResponse(JSON.stringify({ error: "Only PDF files are allowed" }), { status: 400 });
      }

      if (file.size > 5 * 1024 * 1024) {
        return new NextResponse(JSON.stringify({ error: "File size exceeds 5MB" }), { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Prepare FormData to send to Cloudinary using native Web API FormData
      const cloudinaryForm = new FormData();
      cloudinaryForm.append("file", new Blob([buffer], { type: file.type }), file.name);
      cloudinaryForm.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

      // Cloudinary Upload URL
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

      // Upload the file to Cloudinary using fetch
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: cloudinaryForm,
      });

      const result = await response.json();

      if (response.ok) {
        return new NextResponse(
          JSON.stringify({ message: "CV uploaded successfully", cvUrl: result.secure_url }),
          { status: 200 }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ error: result.error.message || "Upload failed" }),
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Upload failed" }),
        { status: 500 }
      );
    }
  } else {
    // Handling non-POST methods
    return new NextResponse(
      JSON.stringify({ error: "Method Not Allowed" }),
      { status: 405 }
    );
  }
};

export default handler;
