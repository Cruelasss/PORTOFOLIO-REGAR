import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    // Cek apakah token ada
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ 
        error: "BLOB_READ_WRITE_TOKEN tidak ditemukan di Environment Variables! Pastikan Blob Store sudah tersambung dengan benar dan sudah di-Redeploy." 
      }, { status: 500 });
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Upload file ke Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      token: token,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error detail:", error);
    return NextResponse.json({ 
      error: "Upload error: " + (error.message || "Unknown error") 
    }, { status: 500 });
  }
}
