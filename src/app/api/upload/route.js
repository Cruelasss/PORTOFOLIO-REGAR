import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const token = process.env.IMG_READ_WRITE_TOKEN || process.env.UPLOAD_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ 
        error: "Blob token tidak ditemukan! Pastikan Blob Store sudah tersambung." 
      }, { status: 500 });
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      token: token,
      addRandomSuffix: true
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Upload error: " + (error.message || "Unknown error") 
    }, { status: 500 });
  }
}
