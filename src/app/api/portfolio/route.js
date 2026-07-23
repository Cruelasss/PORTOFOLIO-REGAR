import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    // Coba ambil dari KV
    let data = null;
    try {
      data = await kv.get('portfolio_data');
    } catch (e) {
      console.log("KV belum di-setup atau tidak ada Env Vars.");
    }
    
    // Jika kosong (baru pertama kali di-deploy) atau error KV, 
    // ambil dari file lokal sebagai nilai awal (default)
    if (!data) {
      const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      data = JSON.parse(fileContents);
      
      // Coba simpan ke KV agar selanjutnya pakai data dari KV
      try {
        await kv.set('portfolio_data', data);
      } catch (e) {
        // Abaikan jika KV belum di-setup
      }
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Simpan ke Vercel KV
    try {
      await kv.set('portfolio_data', data);
    } catch (e) {
      console.log("Gagal menyimpan ke KV (mungkin belum di-setup). Error:", e.message);
    }
    
    // Tetap simpan ke lokal untuk penggunaan localhost
    try {
      const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      // Abaikan error write ini di Vercel (karena read-only)
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 });
  }
}
