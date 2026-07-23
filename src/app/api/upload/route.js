import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const token = process.env.UPLOAD_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ 
        error: "BLOB token tidak ditemukan di Environment Variables!" 
      }, { status: 500 });
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Coba upload sebagai public dulu, kalau gagal coba private
    let blob;
    try {
      blob = await put(file.name, file, {
        access: 'public',
        token: token,
      });
    } catch (publicError) {
      // Jika store private, upload sebagai private
      blob = await put(file.name, file, {
        access: 'private',
        token: token,
      });
    }

    // Gunakan downloadUrl jika tersedia, fallback ke url
    const imageUrl = blob.downloadUrl || blob.url;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Upload error detail:", error);
    return NextResponse.json({ 
      error: "Upload error: " + (error.message || "Unknown error") 
    }, { status: 500 });
  }
}
