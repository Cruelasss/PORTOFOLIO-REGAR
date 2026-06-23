import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

// Jika Anda ingin melihat pesan di admin panel di localhost, 
// ini masih akan membaca dari data/messages.json
export async function GET() {
  try {
    const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    // Inisialisasi Resend
    // Pastikan Anda sudah menambahkan RESEND_API_KEY di .env.local atau Vercel Environment Variables
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // Email pengirim bawaan Resend
      to: process.env.RECEIVER_EMAIL || 'email_anda@gmail.com', // Ganti dengan email Anda jika belum di-set di .env
      subject: `Pesan Baru dari ${name} - Portfolio`,
      text: `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`,
      reply_to: email, // Memungkinkan Anda membalas langsung ke email pengirim
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // (Opsional) Tetap mencoba menulis ke messages.json untuk di lokal
    // Di Vercel ini tidak akan tersimpan permanen, tapi di lokal berguna untuk admin panel
    try {
      if (fs.existsSync(messagesFilePath)) {
        const fileContents = fs.readFileSync(messagesFilePath, 'utf8');
        const messages = JSON.parse(fileContents);
        messages.unshift({ id: Date.now().toString(), date: new Date().toISOString(), name, email, message });
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf8');
      }
    } catch (e) {
      console.log('Cannot write to local file in this environment');
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
